import { Module } from '@nestjs/common';
import SuccessResponse from './model/SuccessResponse';


@Module({
  providers: [SuccessResponse
  ],
  exports: [SuccessResponse,]
})
export class CommonModule { }
