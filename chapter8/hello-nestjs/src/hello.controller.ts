import { Controller, Get } from '@nestjs/common';

@Controller() // 클래스에 붙이며, 컨트롤러로 사용 가능하도록 함
export class HelloController {
  @Get() // HTTP GET 요청
  hello() {
    return 'Hello! This is the first application with Nest.js';
  }
}
