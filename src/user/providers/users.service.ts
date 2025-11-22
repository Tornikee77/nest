import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamDto } from '../dto/get-user-param.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    // Injecting Auth Service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  // method to find all Users
  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      { firstName: 'Tornike', email: 'tornike@gmail.com' },
      { firstName: 'Giorgi', email: 'giorgi@gmail.com' },
    ];
  }
  public findOneById(id: string) {
    return {
      id: '1234',
      firstName: 'Tornike',
      email: 'giorgi@gmail.com',
    };
  }
}
