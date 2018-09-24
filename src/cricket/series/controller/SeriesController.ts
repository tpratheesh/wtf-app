import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import handleError from 'utils/ErrorHandler';
import SeriesForm from '../form/SeriesForm';
import SuccessResponse from 'common/model/SuccessResponse';
import { Logger } from 'logger/Logger';
import { SeriesService } from '../service/SeriesService';

@Controller('api/cricket')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService, private readonly logger: Logger) { }

    @Get('series/list')
    async seriesList(@Req() req): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting series list')
        return await this.seriesService.getSeriesList()
            .catch(error => handleError(error));
    }

    @Put('series')
    async createSeries(@Req() req, @Body() seriesForm: SeriesForm): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting create new series')
        await this.seriesService.saveSeries(seriesForm)
            .catch(error => handleError(error));
        return new SuccessResponse('User Created Successfully');
    }

    @Post('series')
    async updateSeries(@Req() req, @Body() seriesForm: SeriesForm): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting update series')
        await this.seriesService.updateSeries(seriesForm)
            .catch(error => handleError(error));
        return new SuccessResponse('User Updated Successfully');
    }

    @Get('series/:id')
    async getSeriesById(@Req() req, @Param() params): Promise<any> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting get series by ID')
        return await this.seriesService.getSeriesById(params.id)
            .catch(error => handleError(error));
    }

    @Delete('series/:id')
    async deleteSeries(@Req() req, @Param() params): Promise<SuccessResponse> {
        const userName = req.user.name
        this.logger.log('User ' + userName + ' requesting delete series by ID')
        await this.seriesService.deleteSeries(params.id)
            .catch(error => handleError(error));
        return new SuccessResponse('User Deleted Successfully');
    }
}
