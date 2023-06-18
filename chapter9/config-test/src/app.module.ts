import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 환경 설정에 특화된 모듈, 모든 환경변수 설정의 시작
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

console.log('🛠️ env: ' + process.env.NODE_ENV); // print env variable
console.log('🗂️ current working directory: ' + process.cwd()); // print current working directory
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      load: [config],
      cache: true, // 서버 가동된 뒤에는 설정 파일 변경되지 않으므로 성능상 이득
      expandVariables: true, // 확장변수 옵션 추가
    }),
    WeatherModule,
  ],
  // isGlobal: ConfigModule 전역 설정 (else, 모든 파일에서 각각 import )
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
