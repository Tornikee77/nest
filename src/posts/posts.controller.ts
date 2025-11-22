import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  // Injecting Posts Service
  constructor(private readonly postsServices: PostsService) {}

  //  http:localhost:3000/posts/1234
  @Get('{/:userId}')
  public getPosts(@Param('userId') userId: string) {
    return this.postsServices.findAll(userId);
  }
}
