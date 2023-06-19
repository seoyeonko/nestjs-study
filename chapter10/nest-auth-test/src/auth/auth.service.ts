import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // 생성자에서 UserService를 주입받음
  constructor(private userService: UserService) {}

  async register(userDto: CreateUserDto) {
    // 이미 가입된 유저 체크
    const user = await this.userService.getUser(userDto.email);
    if (user) {
      throw new HttpException(
        '해당 유저가 이미 있습니다',
        HttpStatus.BAD_REQUEST, // 400
      );
    }

    // 패스워드 암호화
    const encryptPassword = bcrypt.hashSync(userDto.password, 10); // 10: 암호화 처리 10번 (숫자가 커질 수록 해시값(암호화된 문자열)을 얻는데 시간이 오래 걸림)

    // 데이터베이스에 저장. 저장 중에 에러 나면 서버 에러 발생
    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptPassword,
      });
      // 회원가입 후 반환 값에는 password 주지 않음
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('서버 에러', 500);
    }
  }
}
