import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import handleError from 'utils/ErrorHandler';
import MatchForm from '../form/MatchForm';
import SuccessResponse from 'common/model/SuccessResponse';
import { Logger } from 'logger/Logger';
import { MatchService } from '../service/MatchService';
import { ScoreService } from 'cricket/score/service/ScoreService';

@Controller('api/cricket')
export class MatchController {
    constructor(
        private readonly matchService: MatchService,
        private readonly scoreService: ScoreService,
        private readonly logger: Logger) { }

    @Get('match/list/:series')
    async matchList(@Req() req, @Param() params): Promise<any> {
        const userName = req.user.name
        const seriesId = params.series
        this.logger.log('User ' + userName + ' requesting match list')
        return await this.matchService.getMatchListBySeries(seriesId)
            .catch(error => handleError(error));
    }

    @Get('match/list')
    async matchListAll(@Req() req): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting match list all')
        return await this.matchService.getMatchList()
            .catch(error => handleError(error));
    }

    @Get('match/today')
    async matchListToday(@Req() req): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting todays match list')
        return await this.matchService.getMatchListToday()
            .catch(error => handleError(error));
    }

    @Get('match/upcoming')
    async matchListUpcoming(@Req() req): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting upcoming match list')
        return await this.matchService.getMatchListUpcoming()
            .catch(error => handleError(error));
    }

    @Put('match')
    async createMatch(@Req() req, @Body() matchForm: MatchForm): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting create new match')
        await this.matchService.saveMatch(matchForm)
            .catch(error => handleError(error));
        return new SuccessResponse('User Created Successfully');
    }

    @Post('match')
    async updateMatch(@Req() req, @Body() matchForm: MatchForm): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting update match')
        await this.matchService.updateMatch(matchForm)
            .catch(error => handleError(error));
        return new SuccessResponse('User Updated Successfully');
    }

    @Get('match/:id')
    async getMatchById(@Req() req, @Param() params): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting get match by ID')
        return await this.matchService.getMatchById(params.id)
            .catch(error => handleError(error));
    }

    @Get('match/name/:matchName')
    async getMatchByName(@Req() req, @Param() params): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting get match by matchName')
        console.log(params.matchName)
        return await this.matchService.getMatchByName(params.matchName)
            .catch(error => handleError(error));
    }

    @Delete('match/:id')
    async deleteMatch(@Req() req, @Param() params): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting delete match by ID')
        await this.matchService.deleteMatch(params.id)
            .catch(error => handleError(error));
        return new SuccessResponse('User Deleted Successfully');
    }

    @Get('matches/live')
    async matchLive(@Req() req): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting match live')
        return await this.scoreService.getLiveMatches()
            .catch(error => handleError(error));
    }
}
