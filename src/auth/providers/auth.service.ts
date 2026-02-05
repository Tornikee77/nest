import { Inject, Injectable, forwardRef } from "@nestjs/common";

import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
}
