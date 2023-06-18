import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 환경 설정에 특화된 모듈, 모든 환경변수 설정의 시작
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WeatherModule],
  // isGlobal: ConfigModule 전역 설정 (else, 모든 파일에서 각각 import )
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
