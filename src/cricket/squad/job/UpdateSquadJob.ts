import { Injectable } from '@nestjs/common';
import { Logger } from 'logger/Logger';
import MatchForm from '../../match/form/MatchForm';
import { MatchService } from '../../match/service/MatchService';
import * as request from 'request';
import * as cheerio from 'cheerio';
import { ConfigService } from 'config/ConfigService';
import { SeriesService } from '../../series/service/SeriesService';
import { TeamService } from '../../team/service/TeamService';
import TeamForm from '../../team/form/TeamForm';
import * as moment from 'moment';
import SquadForm from '../form/SquadForm';
import { SquadService } from '../service/SquadService';
import { Match } from '../../match/interface/Match';
import SquadUpdateForm from '../form/SquadUpdateForm';

@Injectable()
export class UpdateSquadJob {
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

    async parseAndUpdateSquadList() {
        console.log('Updating squad details...');
        let matchesList = await this.matchService.getMatchListUpcoming();
        console.log(matchesList.length)
        matchesList.reduce((promiseChain, arrayItem) =>
            promiseChain.then(() => this.updateMatchSquads(arrayItem)), Promise.resolve());
    }

    async updateMatchSquads(match: any) {
        const matchUrl = match.matchUrl;
        const url = this.baseUrl + matchUrl
        request(url, async (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);
            const mainDiv = $('article.squad');

            const buttons = $('button.button-filter-alt', mainDiv);
            if (buttons == undefined || buttons.length == 0) {
                console.log('no squads here')
            } else {
                const teamName1 = $(buttons[0])
                    .find('span.team-name')
                    .text();
                const teamName2 = $(buttons[1])
                    .find('span.team-name')
                    .text();

                console.log(teamName1, teamName2)

                let team1 = await this.teamService.getTeamByName(teamName1);
                let team2 = await this.teamService.getTeamByName(teamName2);

                let squad1 = await this.squadService.getSquadById(match.squad1._id);
                let squad2 = await this.squadService.getSquadById(match.squad2._id);

                if (team1._id.equals(squad1.team)) {
                    //update squad 1 with team 1 players
                    let playerList1 = [];
                    const team1Div = $('div.content-tab', mainDiv)[0];
                    const team1Table = $('table', team1Div);
                    $('tbody tr', team1Table).each(function () {
                        const nameTd = $('td', this)[0];
                        const roleTd = $('td', this)[1];
                        const name = $(nameTd).text().split('(c)')[0].split('†')[0].trim();
                        playerList1.push({ 'name': name, 'role': $(roleTd).text(), 'isPlaying': false });
                    });
                    this.squadService.updateSquadPlayers(new SquadUpdateForm(squad1._id, playerList1));
                } else if (team2._id.equals(squad1.team)) {
                    //update squad 1 with team 2 players
                    let playerList1 = [];
                    const team2Div = $('div.content-tab', mainDiv)[1];
                    const team2Table = $('table', team2Div);
                    $('tbody tr', team2Table).each(function () {
                        const nameTd = $('td', this)[0];
                        const roleTd = $('td', this)[1];
                        const name = $(nameTd).text().split('(c)')[0].split('†')[0].trim();
                        playerList1.push({ 'name': name, 'role': $(roleTd).text(), 'isPlaying': false });
                    });
                    this.squadService.updateSquadPlayers(new SquadUpdateForm(squad1._id, playerList1));
                }


                if (team1._id.equals(squad2.team)) {
                    //update squad 2 with team 1 players
                    let playerList2 = [];
                    const team1Div = $('div.content-tab', mainDiv)[0];
                    const team1Table = $('table', team1Div);
                    $('tbody tr', team1Table).each(function () {
                        const nameTd = $('td', this)[0];
                        const roleTd = $('td', this)[1];
                        const name = $(nameTd).text().split('(c)')[0].split('†')[0].trim();
                        playerList2.push({ 'name': name, 'role': $(roleTd).text(), 'isPlaying': false });
                    });
                    this.squadService.updateSquadPlayers(new SquadUpdateForm(squad2._id, playerList2));
                } else if (team2._id.equals(squad2.team)) {
                    //update squad 2 with team 2 players
                    let playerList2 = [];
                    const team2Div = $('div.content-tab', mainDiv)[1];
                    const team2Table = $('table', team2Div);
                    $('tbody tr', team2Table).each(function () {
                        const nameTd = $('td', this)[0];
                        const roleTd = $('td', this)[1];
                        const name = $(nameTd).text().split('(c)')[0].split('†')[0].trim();
                        playerList2.push({ 'name': name, 'role': $(roleTd).text(), 'isPlaying': false });
                    });
                    this.squadService.updateSquadPlayers(new SquadUpdateForm(squad2._id, playerList2));
                }
            }
        });
    }
}