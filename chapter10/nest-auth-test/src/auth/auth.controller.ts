import { Body, Controller, Post, Request, Response } from '@nestjs/common';
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

  @Post('login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validationUser(
      req.body.email,
      req.body.password,
    );

    console.log('>>>>>>>>>>>>>>>>', userInfo);

    if (userInfo) {
      // 유저정보가 있으면, 쿠키 정보를 res에 저장
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false, // 브라우저에서 읽을 수 있도록 함
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    return res.send({ message: 'login success' });
  }
}
