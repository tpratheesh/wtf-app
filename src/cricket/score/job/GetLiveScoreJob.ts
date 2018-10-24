import * as request from 'request';
import * as cheerio from 'cheerio';
import { Tedis } from "redis-typescript";
import { ScoreService } from '../service/ScoreService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetLiveScoreJob {

    constructor(
        private readonly scoreService: ScoreService
    ) { }


    async parseAndGetLiveScore() {
        console.log('GetLiveScoreJob job');
        const url = 'http://www.espncricinfo.com/scores';

        request(url, async (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);

            let scores = [];
            $('div.cscore--live').each(function () {
                let scoreObj = {}
                const match = $('.cscore_info-overview', $(this)).text();
                const status = $('.cscore_date-time span.cscore_date', $(this)).text();
                const matchExists = true;
                if (matchExists) {
                    scoreObj['match'] = match
                    scoreObj['status'] = status
                    $('ul.cscore_competitors li', $(this)).each(function (index) {
                        const team = $('.cscore_name--long', $(this)).text();
                        scoreObj['team' + index] = team
                        const score = $('.cscore_score', $(this)).text();
                        scoreObj['score' + index] = score
                        scores.push(scoreObj);
                    });
                }
            });
            let unique_array = Array.from(new Set(scores))
            await this.scoreService.setLiveMatches(unique_array);
            console.log('emitted ' + unique_array.length)
        });
    }
}