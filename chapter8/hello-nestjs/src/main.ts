import { NestFactory } from '@nestjs/core';
import { HelloModule } from './hello.module';

// Nest.js 시작시키는 함수
async function bootstrap() {
  // NestFactory 이용해 NestApplication 객체 생성
  const app = await NestFactory.create(HelloModule);

  // 3000 포트로 서버 가동
  await app.listen(3000, () => {
    console.log('Server started!');
  });
}

bootstrap();
