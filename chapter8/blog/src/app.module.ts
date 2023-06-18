import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog, BlogSchema } from './blog.schema';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // 몽고디비 연결 설정
    MongooseModule.forRoot(
      'mongodb+srv://tjdus2577:1234@cluster0.3sndhoe.mongodb.net/blog',
    ),
    // 스키마 설정
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  // 프로바이더 설정: 다른 곳에서 DI 사용 가능
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export default class AppModule {}
