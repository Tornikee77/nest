import {
  forwardRef,
  Inject,
  Injectable,
  Req,
  RequestTimeoutException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";
import { HashingProvider } from "./hashing.provider";
import { SignInDto } from "../dtos/sign-in.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject the hashing provider
    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,
  ) {}
  public async signIn(SignInDto: SignInDto) {
    let user = await this.usersService.findOneByEmail(SignInDto.email);
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        SignInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException("Could not compare password");
    }
    if (!isEqual) {
      throw new UnauthorizedException("Invalid credentials provided");
    }
    // JWT hardcoded signing options (temporary)
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: "mysecretkey1234",
        expiresIn: "1h", //token valid for 1 hour
        issuer: "my-nest-api", // identifies the principal that issued the JWT
        audience: "my-nest-users", // identifies uour frontend
      },
    );
  }
}
