import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/providers/users.service';

@Injectable()
export class PostsService {
  // Injecting UsersServices
  constructor(private readonly usersService: UsersService) {}
  //                1234
  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    // Users Service
    // find a User
    return [
      {
        user: user,
        title: 'First Post',
        content: 'First content',
      },
      {
        user: user,
        title: 'Second Post',
        content: 'second content',
      },
    ];
  }
}
