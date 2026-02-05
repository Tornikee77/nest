import { Inject, Injectable, forwardRef } from "@nestjs/common";

import { UsersService } from "src/users/providers/users.service";
import { SignInDto } from "../dtos/sign-in.dto";

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public signIn(signInDto: SignInDto) {
    // find user be email Id
    // thro exception if not found
    // compare the password to hash
    // send confirmation
  }
}
