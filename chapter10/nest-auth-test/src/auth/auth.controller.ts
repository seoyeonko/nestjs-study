import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // HTTP 요청의 Body에 CreateUserDto 타입의 데이터가 오면 class-validator가 유효성 검증함
  // 유효성 검증 통과시 메서드 실행
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }
}
