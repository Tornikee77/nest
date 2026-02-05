import { SignInDto } from "./dtos/sign-in.dto";
import { AuthService } from "./providers/auth.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,
  ) {}

  @Post()
  public async signIn(@Body() signInDto: SignInDto) {}
}
