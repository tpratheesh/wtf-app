import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import handleError from 'utils/ErrorHandler';
import PlayerForm from '../form/PlayerForm';
import SuccessResponse from 'common/model/SuccessResponse';
import { Logger } from 'logger/Logger';
import { PlayerService } from '../service/PlayerService';

@Controller('api/cricket')
export class PlayerController {
    constructor(private readonly playerService: PlayerService, private readonly logger: Logger) { }

    @Get('player/list')
    async playerList(@Req() req): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting player list')
        return await this.playerService.getPlayers()
            .catch(error => handleError(error));
    }

    @Put('player')
    async createPlayer(@Req() req, @Body() playerForm: PlayerForm): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting create new player')
        await this.playerService.savePlayer(playerForm)
            .catch(error => handleError(error));
        return new SuccessResponse('User Created Successfully');
    }

    @Post('player')
    async updatePlayer(@Req() req, @Body() playerForm: PlayerForm): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting update player')
        await this.playerService.updatePlayer(playerForm)
            .catch(error => handleError(error));
        return new SuccessResponse('User Updated Successfully');
    }

    @Get('player/:id')
    async getPlayerById(@Req() req, @Param() params): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting get player by ID')
        return await this.playerService.getPlayerById(params.id)
            .catch(error => handleError(error));
    }

    @Delete('player/:id')
    async deletePlayer(@Req() req, @Param() params): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting delete player by ID')
        await this.playerService.deletePlayer(params.id)
            .catch(error => handleError(error));
        return new SuccessResponse('User Deleted Successfully');
    }
}
