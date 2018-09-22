import { Injectable } from '@nestjs/common';
import { User } from '../model/User';
import { Logger } from 'logger/Logger';

@Injectable()
export class UserService {
    constructor(private readonly logger: Logger) { }

    async findUserByMobileNo(
        mobileNo: String
    ): Promise<any> {
        this.logger.log('Find user By MobileNo');
        return new User('Pratheesh', mobileNo, 'USER')
    }
}
