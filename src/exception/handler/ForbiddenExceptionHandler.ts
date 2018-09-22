import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import ForbiddenException from '../ForbiddenException';

@Catch(ForbiddenException)
export class ForbiddenExceptionHandler implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}