import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';

// @Module: 모듈 설정시 사용하는 데코리에터
@Module({
  // 배열로 모듈에 포함된 컨트롤러 설정
  controllers: [HelloController],
})
export class HelloModule {}
