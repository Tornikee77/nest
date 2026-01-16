import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  // Injecting Posts Service
  constructor(private readonly postsServices: PostsService) {}

  //  http:localhost:3000/posts/1234
  @Get('{/:userId}')
  public getPosts(@Param('userId') userId: string) {
    return this.postsServices.findAll(userId);
  }

  @ApiOperation({
    summary: 'Creates a new post for the blog.',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a success 201 response if the post is created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates and existing blog post in the database.',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a success 20o response if the post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }
}
