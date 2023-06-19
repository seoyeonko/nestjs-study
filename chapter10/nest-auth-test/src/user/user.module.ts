import { Module } from '@nestjs/common';
import UserController from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  // 서비스에서 사용하는 레포지토리를 모듈에 등록 -> 서비스에서 레포 찾기 가능해짐
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
