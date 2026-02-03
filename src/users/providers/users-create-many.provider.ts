import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from "@nestjs/common";
import { DataSource } from "typeorm";
import { CreateManyUsersDto } from "../dtos/create-many-user.dto";
import { User } from "../user.entity";

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to proces request at the moment",
      );
    }

    try {
      for (const user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      await queryRunner.commitTransaction();
      return newUsers;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException("Conflict occurred while creating users", {
        description: String(error),
      });
    } finally {
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          "Could not release query runner connection",
        );
      }
    }
  }
}
