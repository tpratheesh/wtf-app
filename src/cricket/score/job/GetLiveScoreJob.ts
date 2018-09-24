import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'logger/Logger';
import * as request from 'request';
import * as cheerio from 'cheerio';
import { ConfigService } from 'config/ConfigService';

@Injectable()
export class GetLiveScoreJob {
    private readonly baseUrl;

    constructor(
        private readonly config: ConfigService,
        private readonly logger: Logger) {
        this.baseUrl = config.get('BASE_URL')
    }
    async parseAndGetLiveScore() {
        console.log('GetLiveScoreJob job');
        const url = this.baseUrl + '/scores';

        request(url, (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);

            $('div.cscore--live').each(function () {
                const match = $('.cscore_info-overview', $(this)).text();
                console.log(match);
                $('ul.cscore_competitors li', $(this)).each(function () {
                    console.log($('.cscore_name--long', $(this)).text());
                    console.log($('.cscore_score', $(this)).text());
                });
            });
        });
    }
}