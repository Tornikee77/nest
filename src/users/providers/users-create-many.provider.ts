import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}
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
}
