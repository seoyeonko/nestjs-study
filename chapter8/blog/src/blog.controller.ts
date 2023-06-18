import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common'; // @nestjs/common: 모든 데코레이터가 있음
import { BlogService } from './blog.service';

@Controller('blog')
// Controller의 역할: HTTP 요청을 특정 함수가 실행
export class BlogController {
  blogService: BlogService; // 클래스 멤버 변수

  // Nest.js 에서는 DI(의존성 주입)을 사용하지만 배우기 전이므로 생성자 사용 중
  constructor() {
    this.blogService = new BlogService();
  }

  @Get()
  getAllPosts() {
    console.log('모든 게시글 가져오기');
    return this.blogService.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto) {
    // @Body(): 함수의 body로 오는 값을 매개변수에 할당
    console.log('게시글 작성 ');
    console.log(postDto);
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Get('/:id')
  async getPost(@Param('id') id: string) {
    // @Param(): URL param의 값을 함수 매개변수에 할당
    console.log(`[id: ${id}] 게시글 하나 가져오기`);
    const post = await this.blogService.getPost(id);
    console.log(post);
    return post;
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');
    this.blogService.deletePost(id);
    return 'success';
  }

  @Put('/:id')
  updatePost(@Param('id') id, @Body() postDto) {
    console.log(`[id: ${id}] 게시글 업데이트`);
    console.log(postDto);
    return this.blogService.updatePost(id, postDto);
  }
}
