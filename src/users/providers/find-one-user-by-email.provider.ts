import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  public async findOneByEmail(email: string) {
    let user: User | null;
    try {
      user = await this.usersRepository.findOneBy({
        email: email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "Could not fetch the user",
      });
    }
    if (!user) {
      throw new UnauthorizedException("USer doesnot exists");
    }
    return user;
  }
}
