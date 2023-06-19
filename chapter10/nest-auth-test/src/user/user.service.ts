import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 레포지토리 주입 데코레이터
import { User } from './user.entity';
import { Repository } from 'typeorm'; // 레포지토리 임퐆트

@Injectable() // 해당 데코레이터가 있으면 프로바이더가 됨
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }

  async updateUser(email: string, _user: User) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  async getUser(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
