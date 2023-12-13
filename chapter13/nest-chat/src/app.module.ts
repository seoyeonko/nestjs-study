import { ChatGateway, RoomGateway } from './app.gateway';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, RoomGateway],
  // 게이트웨이는 다른 클래스에 주입해서 사용할 수 있는 프로바이더!
})
export class AppModule {}
