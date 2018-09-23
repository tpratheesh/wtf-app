import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'logger/Logger';
import TeamForm from '../form/PlayerForm';
import { PlayerService } from '../service/PlayerService';
import * as request from 'request';
import * as cheerio from 'cheerio';

@Injectable()
export class UpdatePlayerJob {
    constructor(
        private readonly playerService: PlayerService, private readonly logger: Logger) { }

    async parseAndUpdatePlayers() {
        console.log('asdasdas')
    }
}