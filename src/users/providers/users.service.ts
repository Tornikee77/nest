import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from "@nestjs/common";
import { User } from "../user.entity";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { create } from "domain";

/**
 * Controller class for '/users' API endpoint
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting User repository into UsersService
     * */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // Injecting Auth Service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    //Injecting DataSource
    private readonly dataSource: DataSource,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user with email exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    /**
     * Handle exceptions if user exists later
     * */

    // Try to create a new user
    // - Handle Exceptions Later
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

    // Create the user
    return newUser;
  }

  public async createmany(createUserDtos: CreateUserDto[]) {
    let newUsers: User[] = [];
    // create a query runner
    const queryRunner = this.dataSource.createQueryRunner();
    // connect the query runner to database
    await queryRunner.connect();
    // start a transaction
    await queryRunner.startTransaction();

    try {
      // createUserDtos
      for (const user of createUserDtos) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // if we have error, rollback the transaction
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        "Unable to create users at this time, please try again",
      );
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Public method responsible for handling GET request for '/users' endpoint
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limt: number,
    page: number,
  ) {
    return [
      {
        firstName: "John",
        email: "john@doe.com",
      },
      {
        firstName: "Alice",
        email: "alice@doe.com",
      },
    ];
  }

  /**
   * Public method used to find one user using the ID of the user
   */
  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: "Alice",
      email: "alice@doe.com",
    };
  }
}
