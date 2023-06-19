import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // sqlite 설정 메서드 (* 항목만 설정해도 동작함)
      type: 'sqlite', // *데이터베이스 타입
      database: 'nest-auth-test.sqlite', // *데이터베이스 파일명
      entities: [User], // 엔티티 리스트
      synchronize: true, // 데이터베이스에 스키마 동기화 (반드시 개발용으로만 사용, 프로뎍선에서는 서버 가동시 의도치 않게 데이터베이스 스키마 변경할 수 있음)
      logging: true, // SQL 실행 로그 확인
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
