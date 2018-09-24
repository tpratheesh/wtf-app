import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'logger/Logger';
import MatchForm from '../form/MatchForm';
import { MatchService } from '../service/MatchService';
import * as request from 'request';
import * as cheerio from 'cheerio';
import { ConfigService } from 'config/ConfigService';
import { SeriesService } from '../../series/service/SeriesService';

@Injectable()
export class UpdateMatchJob {
    private readonly baseUrl;

    constructor(
        private readonly matchService: MatchService,
        private readonly seriesService: SeriesService,
        private readonly config: ConfigService,
        private readonly logger: Logger) {
        this.baseUrl = this.config.get('BASE_URL')
    }

    async parseAndUpdateMatchList() {
        console.log('Updating match details...');
        let seriesList = await this.seriesService.getSeriesList();
        seriesList.forEach(series => {
            this.getMatchDetails(series);
        });
    }

    async getMatchDetails(series) {
        const url = this.baseUrl + series.seriesUrl;
        request(url, (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);

            const menu = $('#global-nav-secondary');
            const items = $('div.global-nav-container ul.first-group li', menu)

            const newUrl = $(items)
                .first()
                .next('li')
                .next('li')
                .find('a')
                .attr('href');

            this.updateMatchDetails(series, newUrl);
        });
    }

    async updateMatchDetails(series, url) {
        console.log(url);
        console.log(series._id)
        request(url, (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);
            let matches = []
            $('div.cscore').each(function () {
                const match = $('.cscore_info-overview', $(this)).text();
                matches.push(match);
            });

            matches.forEach(async (match: String) => {
                let splits = match.split(',');
                let date = new Date(splits[splits.length - 1])
                let form = new MatchForm(match, match, series._id, date);
                const saved = await this.matchService.saveMatch(form);
                console.log(saved);
            });
        });
    }
}