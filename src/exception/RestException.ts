import { HttpException, HttpStatus } from '@nestjs/common';

export default class RestException extends HttpException {
    constructor(message: String) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
