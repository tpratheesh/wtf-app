import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'logger/Logger';
import TeamForm from '../form/TeamForm';
import { TeamService } from '../service/TeamService';
import * as request from 'request';
import * as cheerio from 'cheerio';

@Injectable()
export class UpdateTeamJob {
    constructor(
        private readonly teamService: TeamService, private readonly logger: Logger) { }

    async parseAndUpdateTeams() {
        const ratingUrl = 'http://www.espncricinfo.com/rankings/content/page/211271.html';
        request(ratingUrl, (err, resp, body) => {
            if (err)
                throw err;
            let $ = cheerio.load(body);

            let teams = []
            let testTeams = []
            let odiTeams = []
            let t20Teams = []

            $('table.StoryengineTable')
                .first()
                .find('tbody tr')
                .not('.head')
                .each(function () {
                    const teamName = $('td', $(this)).first().text();
                    testTeams.push(teamName);
                    if (teams.indexOf(teamName) < 0) {
                        teams.push(teamName);
                    }
                });
            $('table.StoryengineTable')
                .first()
                .nextAll('table.StoryengineTable')
                .first()
                .find('tbody tr')
                .not('.head')
                .each(function () {
                    const teamName = $('td', $(this)).first().text();
                    odiTeams.push(teamName);
                    if (teams.indexOf(teamName) < 0) {
                        teams.push(teamName);
                    }
                });
            $('table.StoryengineTable')
                .first()
                .nextAll('table.StoryengineTable')
                .nextAll('table.StoryengineTable')
                .first()
                .find('tbody tr')
                .not('.head')
                .each(function () {
                    const teamName = $('td', $(this)).first().text();
                    t20Teams.push(teamName);
                    if (teams.indexOf(teamName) < 0) {
                        teams.push(teamName);
                    }
                });

            const url = 'http://www.espncricinfo.com/story/_/id/18791072/all-cricket-teams-index';

            request(url, (err, resp, body) => {
                if (err)
                    throw err;
                let $ = cheerio.load(body);

                $('p a', 'div.article-body').each(function () {
                    const teamName = $(this).text();
                    if (teams.indexOf(teamName) < 0) {
                        teams.push(teamName);
                    }
                });
                teams.forEach((teamName) => {
                    let isTest = false
                    let isODI = false
                    let isT20 = false
                    if (testTeams.indexOf(teamName) > -1) {
                        isTest = true
                    }
                    if (odiTeams.indexOf(teamName) > -1) {
                        isODI = true
                    }
                    if (t20Teams.indexOf(teamName) > -1) {
                        isT20 = true
                    }
                    const teamForm = new TeamForm(teamName, isTest, isODI, isT20);
                    this.teamService.saveTeam(teamForm);
                });
            });

        });


    }
}