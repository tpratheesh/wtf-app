import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import RestException from '../RestException';

@Catch(RestException)
export class RestExceptionFilter implements ExceptionFilter {
    catch(exception: RestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.message;

        let messages = []
        messages.push(message)

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                messages: messages
            });
    }
}