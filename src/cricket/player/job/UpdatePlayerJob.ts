import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'logger/Logger';
import { PlayerService } from '../service/PlayerService';
import * as request from 'request';
import * as cheerio from 'cheerio';

@Injectable()
export class UpdatePlayerJob {
    constructor(
        private readonly playerService: PlayerService, private readonly logger: Logger) { }

    async parseAndUpdatePlayers() {
        const url = 'http://www.espncricinfo.com/pakistan/content/player/country.html?country=7';
        request(url, (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);
            const mainDiv = $('#rectPlyr_Playerlistall table.playersTable');

            let playerList = [];
            $('tbody tr td a', mainDiv).each(function () {
                playerList.push({ name: $(this).text(), playerUrl: $(this).attr('href') });
            });

            playerList.reduce((promiseChain, arrayItem) =>
                promiseChain.then(() => this.createPlayer(arrayItem)), Promise.resolve());
        });
    }

    async createPlayer(player) {
        this.playerService.savePlayer(player);
        console.log('updated ', player.name)
    }
}