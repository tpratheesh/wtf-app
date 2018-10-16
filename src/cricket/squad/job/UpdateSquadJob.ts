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
import SquadPlayerForm from '../form/SquadPlayerForm';
import PlayerForm from 'cricket/player/form/PlayerForm';

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
        let matchesList = await this.matchService.getMatchListToday();
        console.log(matchesList.length)
        matchesList.reduce((promiseChain, arrayItem) =>
            promiseChain.then(() => this.updateMatchSquads(arrayItem)), Promise.resolve());
    }

    async updateMatchSquads(match: any) {
        const matchUrl = match.matchUrl;
        const url = this.baseUrl + matchUrl
        console.log(url)
        request(url, async (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);
            const gameHeader = $('div.gameHeader');
            const matchNames = $('div.cscore_info-overview', gameHeader);
            const matchNameDiv = $(matchNames)[0];
            const matchName = $(matchNameDiv).text();
            console.log(matchName);

            await this.matchService.updateMatchDescription(match._id, matchName);

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

                console.log(squad1, squad2)

                if (team1._id.equals(squad1.team._id)) {
                    //update squad 1 with team 1 players
                    let playerList1: Array<SquadPlayerForm> = [];
                    const team1Div = $('div.content-tab', mainDiv)[0];
                    const team1Table = $('table', team1Div);
                    $('tbody tr', team1Table).each(function () {
                        const nameTd = $('td', this)[0];
                        const roleTd = $('td', this)[1];
                        const name: String = $(nameTd).text().split('(c)')[0].split('†')[0].trim();
                        const role: String = $(roleTd).text();
                        const playerUrl = $('a', nameTd).attr('href');
                        const playerForm = new SquadPlayerForm(new PlayerForm(name, playerUrl), role, false);
                        playerList1.push(playerForm);
                    });
                    console.log(squad1._id, playerList1)
                    this.squadService.updateSquadPlayers(squad1._id, new SquadUpdateForm(playerList1));
                } else if (team2._id.equals(squad1.team._id)) {
                    //update squad 1 with team 2 players
                    let playerList1: Array<SquadPlayerForm> = [];
                    const team2Div = $('div.content-tab', mainDiv)[1];
                    const team2Table = $('table', team2Div);
                    $('tbody tr', team2Table).each(function () {
                        const nameTd = $('td', this)[0];
                        const roleTd = $('td', this)[1];
                        const name: String = $(nameTd).text().split('(c)')[0].split('†')[0].trim();
                        const role: String = $(roleTd).text();
                        const playerUrl = $('a', nameTd).attr('href');
                        const playerForm = new SquadPlayerForm(new PlayerForm(name, playerUrl), role, false);
                        playerList1.push(playerForm);
                    });
                    console.log(squad1._id, playerList1)
                    this.squadService.updateSquadPlayers(squad1._id, new SquadUpdateForm(playerList1));
                }


                if (team1._id.equals(squad2.team._id)) {
                    //update squad 2 with team 1 players
                    let playerList2: Array<SquadPlayerForm> = [];
                    const team1Div = $('div.content-tab', mainDiv)[0];
                    const team1Table = $('table', team1Div);
                    $('tbody tr', team1Table).each(function () {
                        const nameTd = $('td', this)[0];
                        const roleTd = $('td', this)[1];
                        const name: String = $(nameTd).text().split('(c)')[0].split('†')[0].trim();
                        const role: String = $(roleTd).text();
                        const playerUrl = $('a', nameTd).attr('href');
                        const playerForm = new SquadPlayerForm(new PlayerForm(name, playerUrl), role, false);
                        playerList2.push(playerForm);
                    });
                    console.log(squad2._id, playerList2)
                    this.squadService.updateSquadPlayers(squad2._id, new SquadUpdateForm(playerList2));
                } else if (team2._id.equals(squad2.team._id)) {
                    //update squad 2 with team 2 players
                    let playerList2: Array<SquadPlayerForm> = [];
                    const team2Div = $('div.content-tab', mainDiv)[1];
                    const team2Table = $('table', team2Div);
                    $('tbody tr', team2Table).each(function () {
                        const nameTd = $('td', this)[0];
                        const roleTd = $('td', this)[1];
                        const name: String = $(nameTd).text().split('(c)')[0].split('†')[0].trim();
                        const role: String = $(roleTd).text();
                        const playerUrl = $('a', nameTd).attr('href');
                        const playerForm = new SquadPlayerForm(new PlayerForm(name, playerUrl), role, false);
                        playerList2.push(playerForm);
                    });
                    console.log(squad2._id, playerList2)
                    this.squadService.updateSquadPlayers(squad2._id, new SquadUpdateForm(playerList2));
                }
            }
        });
    }
}