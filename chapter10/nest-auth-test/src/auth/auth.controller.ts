import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginGuard } from './auth.guard';

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
    const userInfo = await this.authService.validateUser(
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

  // Login Guard 사용
  @UseGuards(LoginGuard)
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 10, // 로그인 테스트를 위해 10초로 설정
      });
    }
    return res.send({ message: 'login2 success' });
  }

  // 로그인한 때만 실행되는 메서드
  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인 된 때만 이 글이 보입니다!!';
  }
}
