import { NestFactory } from '@nestjs/core';
import { RestExceptionFilter } from 'exception/handler/RestExceptionHandler';
import { ForbiddenExceptionHandler } from 'exception/handler/ForbiddenExceptionHandler';
import { ApiFilter } from 'auth/filter/ApiFilter';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useGlobalFilters(new RestExceptionFilter(), new ForbiddenExceptionHandler());
  app.use(ApiFilter);
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  //app.use(app.get('MyLogger'));

  await app.listen(3000);
}
bootstrap();
