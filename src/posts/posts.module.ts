// posts.module.ts
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity'; // Import the entity

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    UsersModule,
    // Add MetaOption here!
    TypeOrmModule.forFeature([Post, MetaOption]),
  ],
})
export class PostsModule {}
