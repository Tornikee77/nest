import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUserParamDto } from 'src/users/dtos/get-users-param.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // Injecting Auth Service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null = null;
    existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

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
