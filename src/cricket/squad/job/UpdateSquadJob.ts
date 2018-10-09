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

    async updateMatchSquads(match: Match) {
        const matchUrl = match.matchUrl;
        console.log(matchUrl)
    }
}