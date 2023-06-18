import { PostDto } from './blog.model'; // 게시글 타입 정보 임포트
// Dto: data transfer object 약자. 데이터를 나타내는 필드가 있고, 함수가 이쓴 ㄴ경우, 필드 값을 가져오거나 설정하느 ㄴ함수가 있음
import { BlogFileRepository, BlogRepository } from './blog.repository';

export class BlogService {
  blogRepository: BlogRepository;

  constructor() {
    this.blogRepository = new BlogFileRepository();
  }

  async getAllPosts() {
    return await this.blogRepository.getAllPost();
  }

  createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  async getPost(id): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  deletePost(id) {
    this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}
