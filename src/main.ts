import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 서버용 에러 로그
  const logger = new Logger('Validation');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        // 클라이언트(사용자)가 보는 에러 정보
        const messages = errors.map((error) => `${error.property}에 대한 입력값(${error.value})이 올바르지 않습니다.`);
        logger.error(messages.join(','));
        return new BadRequestException(messages);
      },
    }),
  );
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
}
bootstrap();
