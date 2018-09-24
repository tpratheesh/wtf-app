import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import handleError from 'utils/ErrorHandler';
import MatchForm from '../form/MatchForm';
import SuccessResponse from 'common/model/SuccessResponse';
import { Logger } from 'logger/Logger';
import { MatchService } from '../service/MatchService';

@Controller('api/cricket')
export class MatchController {
    constructor(private readonly matchService: MatchService, private readonly logger: Logger) { }

    @Get('match/list/:series')
    async matchList(@Req() req, @Param() params): Promise<any> {
        const userName = req.user.name
        const seriesId = params.series
        this.logger.log('User ' + userName + ' requesting match list')
        return await this.matchService.getMatchListBySeries(seriesId)
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

    @Delete('match/:id')
    async deleteMatch(@Req() req, @Param() params): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting delete match by ID')
        await this.matchService.deleteMatch(params.id)
            .catch(error => handleError(error));
        return new SuccessResponse('User Deleted Successfully');
    }
}
