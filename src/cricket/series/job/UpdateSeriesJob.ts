import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'logger/Logger';
import SeriesForm from '../form/SeriesForm';
import { SeriesService } from '../service/SeriesService';
import * as request from 'request';
import * as cheerio from 'cheerio';
import { ConfigService } from 'config/ConfigService';

@Injectable()
export class UpdateSeriesJob {
    private readonly baseUrl;

    constructor(
        private readonly seriesService: SeriesService,
        private readonly config: ConfigService,
        private readonly logger: Logger) {
        this.baseUrl = this.config.get('BASE_URL')
    }

    async parseAndUpdateSeriesList() {
        const url = this.baseUrl + '/ci/content/match/fixtures_futures.html'

        let seriesList = [];
        request(url, (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);
            const mainDiv = $('div.fixfutures');
            const currentSeriesDiv = $('#first', mainDiv);
            $('ul li a', currentSeriesDiv).each(function () {
                seriesList.push({ 'name': $(this).text(), 'link': $(this).attr('href') })
            });
            const futureSeriesDiv = $('#second', mainDiv);
            $('ul li a', futureSeriesDiv).each(function () {
                seriesList.push({ 'name': $(this).text(), 'link': $(this).attr('href') })
            });
            seriesList.reduce((promiseChain, arrayItem) =>
                promiseChain.then(() => this.processSeries(arrayItem)), Promise.resolve());
        })
    }

    async processSeries(series) {
        let form = new SeriesForm(series.name, series.name);
        form.seriesUrl = series.link
        this.seriesService.saveSeries(form);
    }
}