import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamDto } from '../dto/get-user-param.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public createUser(createUserDto: CreateUserDto) {}
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
