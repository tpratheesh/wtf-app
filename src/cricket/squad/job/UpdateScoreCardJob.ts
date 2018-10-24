import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { ConfigService } from 'config/ConfigService';
import { PlayerService } from 'cricket/player/service/PlayerService';
import { Logger } from 'logger/Logger';
import * as request from 'request';
import { MatchService } from '../../match/service/MatchService';
import { SeriesService } from '../../series/service/SeriesService';
import { TeamService } from '../../team/service/TeamService';
import BattingForm from '../form/BattingForm';
import InningsForm from '../form/InningsForm';
import { BattingService } from '../service/BattingService';
import { InningsService } from '../service/InningsService';
import { PlayerInningsService } from '../service/PlayerInningsService';
import { SquadPlayerService } from '../service/SquadPlayerService';
import { SquadService } from '../service/SquadService';

@Injectable()
export class UpdateScoreCardJob {
    private readonly baseUrl;

    constructor(
        private readonly matchService: MatchService,
        private readonly playerService: PlayerService,
        private readonly teamService: TeamService,
        private readonly seriesService: SeriesService,
        private readonly squadService: SquadService,
        private readonly squadPlayerService: SquadPlayerService,
        private readonly inningsService: InningsService,
        private readonly playerInningsService: PlayerInningsService,
        private readonly battingService: BattingService,
        private readonly config: ConfigService,
        private readonly logger: Logger) {
        this.baseUrl = this.config.get('BASE_URL')
    }

    async parseAndUpdateScoreCard() {
        console.log('Updating Score Card Job...', new Date().getTime());
        let matchesList = await this.matchService.getMatchById('5bbc2caf32d98a25fc3e8b93');
        this.updateMatchScoreCard(matchesList);
        // matchesList.reduce((promiseChain, arrayItem) =>
        //     promiseChain.then(() => this.updateMatchScoreCard(arrayItem)), Promise.resolve());
    }

    async updateMatchScoreCard(match: any) {
        const matchUrl = match.matchUrl;
        const url = this.baseUrl + matchUrl
        request(url, async (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);

            const menu = $('#global-nav-tertiary');
            const items = $('div.tertiary-nav-container ul.first-group li', menu)

            const newUrl = $(items)
                .first()
                .next('li')
                .find('a')
                .attr('href');

            this.updateMatchScoreCardDetails(match, newUrl);
        });
    }

    async updateMatchScoreCardDetails(match, newUrl) {
        const url = this.baseUrl + newUrl
        request(url, async (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);
            const scoreCards = $('article.scorecard');

            let matchTotals = {
                runs: 0,
                battingBalls: 0,
                extras: 0,
                wickets: 0
            }
            let squadStatsArr = []

            $(scoreCards).each(function () {
                let squadStats = {}

                const teamName = $(this)
                    .find('ul.css-accordion li.accordion-item div.accordion-header a')
                    .text().split('Innings')[0].trim();
                const teamInnings = $(this)
                    .find('ul.css-accordion li.accordion-item div.accordion-header a')
                    .attr('href');

                squadStats['team'] = teamName;
                squadStats['batting'] = [];

                const teamscores = $(teamInnings);
                const batting = $('div.batsmen div.flex-row>div.batsmen', teamscores);
                let batOrder = 0
                $(batting).each(function () {
                    const cell = $('div.cell', $(this));
                    const nameDiv = $(cell)[0];
                    const name = $(nameDiv).text().split('(c)')[0].split('†')[0].trim();

                    const descriptionDiv = $(cell)[1];
                    const description = $(descriptionDiv).text().trim();

                    const runsDiv = $(cell)[2];
                    const runs = $(runsDiv).text().trim();

                    const ballsDiv = $(cell)[3];
                    const balls = $(ballsDiv).text().trim();
                    matchTotals['battingBalls'] = matchTotals['battingBalls'] + parseInt(balls);

                    const foursDiv = $(cell)[4];
                    const fours = $(foursDiv).text().trim();

                    const sixesDiv = $(cell)[5];
                    const sixes = $(sixesDiv).text().trim();

                    const srDiv = $(cell)[6];
                    let sr = $(srDiv).text().trim();
                    if (sr == '-') {
                        sr = 0
                    }
                    batOrder += 1;
                    squadStats['batting'].push({
                        name,
                        description,
                        runs,
                        balls,
                        fours,
                        sixes,
                        sr,
                        batOrder
                    })
                });

                const extras = $('div.batsmen div.flex-row>div.extras', teamscores);
                $(extras).each(function () {
                    const cell = $('div.cell', $(this));
                    const extraRunsDiv = $(cell)[1];
                    const extraRunsDescription = $(extraRunsDiv).text();
                    const extraRuns = extraRunsDescription.split('(')[0].trim();
                    squadStats['extras'] = {
                        extraRunsDescription,
                        extraRuns: parseInt(extraRuns)
                    }
                });
                matchTotals['extras'] = matchTotals['extras'] + squadStats['extras'].extraRuns || 0;

                const totals = $('div.batsmen div.flex-row>div.total', teamscores);
                $(totals).each(function () {
                    const cell = $('div.cell', $(this));
                    const totalRunsDiv = $(cell)[1];
                    const totalRunsDescription = $(totalRunsDiv).text();
                    const totalRuns = totalRunsDescription.split('/')[0].split('all')[0].trim();
                    squadStats['total'] = {
                        totalRunsDescription,
                        totalRuns: parseInt(totalRuns)
                    }
                });
                matchTotals['runs'] = matchTotals['runs'] + squadStats['total'].totalRuns || 0;

                squadStats['bowling'] = [];
                const bowling = $('div.bowling table tbody tr', teamscores);
                let totalWickets = 0;
                $(bowling).each(function () {
                    const nameDiv = $('td', $(this))[0];
                    const name = $(nameDiv).text().split('(c)')[0].split('†')[0].trim();

                    const oversDiv = $('td', $(this))[2];
                    const overs = $(oversDiv).text().trim();

                    const maidenDiv = $('td', $(this))[3];
                    const maiden = $(maidenDiv).text().trim();

                    const runsDiv = $('td', $(this))[4];
                    const runs = $(runsDiv).text().trim();

                    const wicketsDiv = $('td', $(this))[5];
                    const wickets = $(wicketsDiv).text().trim();
                    totalWickets += parseInt(wickets);

                    const erDiv = $('td', $(this))[6];
                    const er = $(erDiv).text().trim();
                    squadStats['bowling'].push({
                        name,
                        overs,
                        maiden,
                        runs,
                        wickets,
                        er
                    });
                });
                squadStats['totalWickets'] = totalWickets
                matchTotals['wickets'] = matchTotals['wickets'] + totalWickets;
                squadStatsArr.push(squadStats)
            });

            const tmpBowling = squadStatsArr[0].bowling
            squadStatsArr[0].bowling = squadStatsArr[1].bowling
            squadStatsArr[1].bowling = tmpBowling

            squadStatsArr.reduce((promiseChain, arrayItem, index) =>
                promiseChain.then(() => this.updateMatchScoreCardToDB(arrayItem, match, matchTotals)), Promise.resolve());
        });
    }

    async updateMatchScoreCardToDB(squadStats, match, matchTotals) {
        console.log(matchTotals)
        if (match.squad1.team.name.trim() == squadStats.team.trim()) {
            let innings = undefined;
            let inningsForm = new InningsForm(Number(squadStats.total.totalRuns),
                Number(squadStats.extras.extraRuns),
                Number(squadStats.totalWickets),
                squadStats.total.totalRunsDescription,
                squadStats.extras.extraRunsDescription);
            if (match.squad1.innings1 == undefined || match.squad1.innings1 == null) {
                innings = await this.inningsService.saveInnings(inningsForm);
            } else {
                innings = await this.inningsService.getOrCreateAndGetInningsById(match.squad1.innings1._id);
                inningsForm.id = innings._id;
                innings = await this.inningsService.saveInnings(inningsForm);
            }
            let squad = await this.squadService.getSquadById(match.squad1);
            squad = await this.squadService.updateSquadInnings1(squad._id, innings);

            const battingArr = squadStats.batting
            battingArr.forEach(async (bat) => {
                const player = await this.playerService.getPlayerByName(bat.name);
                const squadPlayers = match.squad1.players.filter(e => e.player._id.toString() == player._id.toString());

                if (squadPlayers.length > 0) {
                    const squadPlayerId = squadPlayers[0] == undefined ? undefined : squadPlayers[0]._id
                    if (squadPlayerId != undefined) {
                        const squadPlayer = await this.squadPlayerService.getSquadPlayerById(squadPlayerId);
                        let playerInnings1 = await this.playerInningsService.getOrCreateAndGetInningsById(squadPlayer.innings1 == undefined ? undefined : squadPlayer.innings1._id);

                        const points: number = await this.getPlayerT20BattingPoints(bat, matchTotals);

                        const battingForm = new BattingForm(bat.runs, bat.balls, bat.sr, bat.fours, bat.sixes, bat.points, bat.description, bat.batOrder);
                        battingForm.id = playerInnings1.batting._id
                        const batting = await this.battingService.saveBatting(battingForm);
                        playerInnings1 = await this.playerInningsService.updateBatting(playerInnings1._id, batting._id);

                        await this.squadPlayerService.updatePlayerInnings1(squadPlayerId, playerInnings1);
                    }
                }
            });
        } else if (match.squad2.team.name.trim() == squadStats.team.trim()) {
            let innings = undefined;
            let inningsForm = new InningsForm(Number(squadStats.total.totalRuns),
                Number(squadStats.extras.extraRuns),
                Number(squadStats.totalWickets),
                squadStats.total.totalRunsDescription,
                squadStats.extras.extraRunsDescription);
            if (match.squad2.innings1 == undefined || match.squad2.innings1 == null) {
                innings = await this.inningsService.saveInnings(inningsForm);
            } else {
                innings = await this.inningsService.getOrCreateAndGetInningsById(match.squad2.innings1._id);
                inningsForm.id = innings._id;
                innings = await this.inningsService.saveInnings(inningsForm);
            }
            let squad = await this.squadService.getSquadById(match.squad2);
            squad = await this.squadService.updateSquadInnings1(squad._id, innings);

            const battingArr = squadStats.batting
            battingArr.forEach(async (bat) => {
                const player = await this.playerService.getPlayerByName(bat.name);
                const squadPlayers = match.squad2.players.filter(e => e.player._id.toString() == player._id.toString());
                if (squadPlayers.length > 0) {
                    const squadPlayerId = squadPlayers[0] == undefined ? undefined : squadPlayers[0]._id

                    if (squadPlayerId != undefined) {
                        const squadPlayer = await this.squadPlayerService.getSquadPlayerById(squadPlayerId);
                        let playerInnings1 = await this.playerInningsService.getOrCreateAndGetInningsById(squadPlayer.innings1 == undefined ? undefined : squadPlayer.innings1._id);

                        const points: number = await this.getPlayerT20BattingPoints(bat, matchTotals);

                        const battingForm = new BattingForm(bat.runs, bat.balls, bat.sr, bat.fours, bat.sixes, 0, bat.description, bat.batOrder);
                        battingForm.id = playerInnings1.batting._id
                        const batting = await this.battingService.saveBatting(battingForm);
                        playerInnings1 = await this.playerInningsService.updateBatting(playerInnings1._id, batting._id);

                        await this.squadPlayerService.updatePlayerInnings1(squadPlayerId, playerInnings1);
                    }
                }
                match.squad2.players.filter(e => e.player._id == player._id)._id || undefined;
            });
        }
    }

    async getPlayerODIBattingPoints(bat, matchTotals): Promise<number> {
        const avgSR = parseInt(matchTotals['runs']) / parseInt(matchTotals['battingBalls']);
        const batPoints = avgSR * parseInt(bat.runs);
        const fourBonus = parseInt(bat.fours) * 1;
        const sixBonus = parseInt(bat.sixes) * 2;
        let mileStoneBonus = 0
        if (parseInt(bat.runs) > 99) {
            mileStoneBonus = 30;
        } else if (parseInt(bat.runs) > 79) {
            mileStoneBonus = 25;
        }
        else if (parseInt(bat.runs) > 49) {
            mileStoneBonus = 10;
        }
        else if (parseInt(bat.runs) > 29) {
            mileStoneBonus = 5;
        }
        const playerPoints = Math.round(batPoints + fourBonus + sixBonus + mileStoneBonus)
        console.log('playerPoints: ', playerPoints)
        return playerPoints;
    }

    async getPlayerTestBattingPoints(bat, matchTotals): Promise<number> {
        return 0;
    }

    async getPlayerT20BattingPoints(bat, matchTotals): Promise<number> {
        const avgSR = (parseInt(matchTotals['runs']) / parseInt(matchTotals['battingBalls'])) * 100;
        const batMultiplier = parseInt(matchTotals['battingBalls']) / (parseInt(matchTotals['runs']));
        const batPoints = (batMultiplier) * parseInt(bat.runs)
        let srBonus = ((bat.sr - avgSR) / 10);
        if (parseInt(bat.balls) > 5) {
            srBonus = Math.max(srBonus, 0);
        } else {
            srBonus = 0;
        }
        const sixBonus = parseInt(bat.sixes) * 2;
        let mileStoneBonus = 0
        if (parseInt(bat.runs) > 99) {
            mileStoneBonus = 30;
        } else if (parseInt(bat.runs) > 79) {
            mileStoneBonus = 25;
        }
        else if (parseInt(bat.runs) > 49) {
            mileStoneBonus = 10;
        }
        else if (parseInt(bat.runs) > 29) {
            mileStoneBonus = 5;
        }
        const playerPoints = Math.round(batPoints + srBonus + sixBonus + mileStoneBonus);
        console.log(bat.name, bat.runs, '(' + bat.balls + ')', ' batPoints: ', batPoints, ' srBonus : ', srBonus, ' sixBonus: ', sixBonus, ' mileStoneBonus: ', mileStoneBonus, ' playerPoints: ', playerPoints)
        // console.log(playerPoints)
        return playerPoints;
    }
}