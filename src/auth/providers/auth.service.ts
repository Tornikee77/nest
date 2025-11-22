import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public login(email: string, password: string, id: string) {
    const user = this.usersService.findOneById('1234');
    return 'Token1234';
  }

  public isAuth() {
    return true;
  }
}
