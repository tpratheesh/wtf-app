import { Injectable } from '@nestjs/common';
import { Logger } from 'logger/Logger';
import MatchForm from '../form/MatchForm';
import { MatchService } from '../service/MatchService';
import * as request from 'request';
import * as cheerio from 'cheerio';
import { ConfigService } from 'config/ConfigService';
import { SeriesService } from '../../series/service/SeriesService';
import { TeamService } from '../../team/service/TeamService';
import TeamForm from '../../team/form/TeamForm';
import * as moment from 'moment';
import SquadForm from '../../squad/form/SquadForm';
import { SquadService } from '../../squad/service/SquadService';

@Injectable()
export class UpdateMatchJob {
    private readonly baseUrl;

    constructor(
        private readonly matchService: MatchService,
        private readonly teamService: TeamService,
        private readonly seriesService: SeriesService,
        private readonly squadService: SquadService,
        private readonly config: ConfigService,
        private readonly logger: Logger) {
        this.baseUrl = this.config.get('BASE_URL')
    }

    async parseAndUpdateMatchList() {
        console.log('Updating match details...');
        let seriesList = await this.seriesService.getSeriesList();
        seriesList.reduce((promiseChain, arrayItem) =>
            promiseChain.then(() => this.getMatchDetails(arrayItem)), Promise.resolve());
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
        request(url, (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);
            let matches = []
            $('div.cscore--pregame').each(function () {
                const match = $('.cscore_info-overview', $(this)).text();
                console.log(match);
                const teams = $('ul.cscore_competitors li', $(this));
                const team1Name = $(teams)
                    .first()
                    .find('span.cscore_name--long')
                    .text();
                const team1ShortName = $(teams)
                    .first()
                    .find('span.cscore_name--abbrev')
                    .text();
                const team2Name = $(teams)
                    .first()
                    .next()
                    .find('span.cscore_name--long')
                    .text();
                const team2ShortName = $(teams)
                    .first()
                    .next()
                    .find('span.cscore_name--abbrev')
                    .text();

                const startDate = $('span.cscore_date', $(this)).text();
                console.log(startDate);
                const startDateSplits = startDate.split(' - ');
                const startDateTimeLong = startDateSplits[startDateSplits.length - 1];
                const startDateTimeSplits = startDateTimeLong.split(' ');
                const startDateTime = startDateTimeSplits[0] + ' ' + startDateTimeSplits[1];

                let matchStartDate = null;
                let matchEndDate = null;
                let matchNameSplits = match.split(',');
                const dateStr = matchNameSplits[matchNameSplits.length - 1].trim();
                console.log(dateStr)

                let startDateMonth = '';
                let startDateYear = '';
                let endDateMonth = '';
                let endDateYear = '';
                let dateStartDate = '';
                let dateEndDate = '';
                const dateStrSplits = dateStr.split(' ');
                if (dateStrSplits.length == 3) {
                    startDateMonth = dateStrSplits[0].trim();
                    startDateYear = dateStrSplits[2].trim();
                    endDateMonth = dateStrSplits[0].trim();
                    endDateYear = dateStrSplits[2].trim();
                    const dateDateSplits = dateStrSplits[1];
                    const dateDateSplitsSplits = dateDateSplits.split('-');
                    if (dateDateSplitsSplits.length > 1) {
                        dateStartDate = dateDateSplitsSplits[0].trim();
                        dateEndDate = dateDateSplitsSplits[1].trim();
                    } else {
                        dateStartDate = dateDateSplitsSplits[0].trim();
                        dateEndDate = dateDateSplitsSplits[0].trim();
                    }
                } else if (dateStrSplits.length == 6) {
                    startDateMonth = dateStrSplits[0].trim();
                    startDateYear = dateStrSplits[5].trim();
                    endDateMonth = dateStrSplits[3].trim();
                    endDateYear = dateStrSplits[5].trim();
                    dateStartDate = dateStrSplits[1].trim();
                    dateEndDate = dateStrSplits[4].trim();
                } else if (dateStrSplits.length == 7) {
                    startDateMonth = dateStrSplits[0].trim();
                    startDateYear = dateStrSplits[2].trim();
                    endDateMonth = dateStrSplits[4].trim();
                    endDateYear = dateStrSplits[6].trim();
                    dateStartDate = dateStrSplits[1].trim();
                    dateEndDate = dateStrSplits[5].trim();
                }

                console.log(dateStartDate, startDateMonth, startDateYear, ' :: ', dateEndDate, endDateMonth, endDateYear)
                console.log(startDate)
                matchStartDate = moment(dateStartDate + ' ' + startDateMonth + ' ' + startDateYear + ' ' + startDateTime).utc(false).toDate();
                matchEndDate = moment(dateEndDate + ' ' + endDateMonth + ' ' + endDateYear + ' 11:59 PM').utc(false).toDate();
                console.log(matchStartDate, matchEndDate)

                const summaryBtn = $('div.cscore_buttonGroup ul.cscore_list li', $(this))[0];
                const matchUrl = $('a', summaryBtn).attr('href');
                console.log(matchUrl);

                matches.push({
                    name: match,
                    description: match,
                    series,
                    matchStartDate,
                    matchEndDate,
                    team1Name,
                    team2Name,
                    team1ShortName,
                    team2ShortName,
                    matchUrl
                });
            });
            matches.reduce((promiseChain, arrayItem) =>
                promiseChain.then(() => this.createMatch(arrayItem)), Promise.resolve());
        });
    }

    async createMatch(match) {
        let team1 = await this.teamService.getTeamByName(match.team1Name);
        if (team1 == null) {
            team1 = await this.teamService.saveTeam(new TeamForm(match.team1Name, match.team1ShortName));
        }
        let squad1 = await this.squadService.saveSquad(new SquadForm(team1._id));

        let team2 = await this.teamService.getTeamByName(match.team2Name);
        if (team2 == null) {
            team2 = await this.teamService.saveTeam(new TeamForm(match.team2Name, match.team2ShortName));
        }
        let squad2 = await this.squadService.saveSquad(new SquadForm(team2._id));

        const form = new MatchForm(
            match.name,
            match.description,
            match.series,
            match.matchStartDate,
            match.matchEndDate,
            squad1._id,
            squad2._id,
            match.matchUrl);
        await this.matchService.saveMatch(form);
    }
}