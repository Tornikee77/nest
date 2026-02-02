import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamDto } from 'src/users/dtos/get-users-param.dto';

@Injectable()
export class UsersService {
  constructor(
    // Injecting Auth Service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  // Method to find all Users
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    return [
      { firstName: 'Mindia', email: 'Mindia@gmail.com' },
      { firstName: 'Giorgi', email: 'Giorgi@gmail.com' },
    ];
  }

  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Giorgi',
      email: 'Giorgi@gmail.com',
    };
  }
}
