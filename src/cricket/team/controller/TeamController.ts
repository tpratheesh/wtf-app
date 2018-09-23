import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import handleError from 'utils/ErrorHandler';
import TeamForm from '../form/TeamForm';
import SuccessResponse from 'common/model/SuccessResponse';
import { Logger } from 'logger/Logger';
import { TeamService } from '../service/TeamService';

@Controller('api/cricket')
export class TeamController {
    constructor(private readonly teamService: TeamService, private readonly logger: Logger) { }

    @Get('team/list')
    async teamList(@Req() req): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting team list')
        return await this.teamService.getTeams()
            .catch(error => handleError(error));
    }

    @Put('team')
    async createTeam(@Req() req, @Body() teamForm: TeamForm): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting create new team')
        await this.teamService.saveTeam(teamForm)
            .catch(error => handleError(error));
        return new SuccessResponse('User Created Successfully');
    }

    @Post('team')
    async updateTeam(@Req() req, @Body() teamForm: TeamForm): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting update team')
        await this.teamService.updateTeam(teamForm)
            .catch(error => handleError(error));
        return new SuccessResponse('User Updated Successfully');
    }

    @Get('team/:id')
    async getTeamById(@Req() req, @Param() params): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting get team by ID')
        return await this.teamService.getTeamById(params.id)
            .catch(error => handleError(error));
    }

    @Delete('team/:id')
    async deleteTeam(@Req() req, @Param() params): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting delete team by ID')
        await this.teamService.deleteTeam(params.id)
            .catch(error => handleError(error));
        return new SuccessResponse('User Deleted Successfully');
    }
}
