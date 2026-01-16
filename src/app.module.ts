import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [User],
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      host: 'localhost',
      database: 'nestblog-api',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
