import { Module, forwardRef } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./providers/auth.service";
import { UsersModule } from "src/users/users.module";
import { HashingProvider } from "./providers/hashing.provider";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { SignInProvider } from "./providers/sign-in.provider";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SignInProvider,
  ],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: "mysecretkey1234",
      signOptions: {
        expiresIn: "1h",
        issuer: "my-nest-api",
        audience: "my-nest-users",
      },
    }),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
