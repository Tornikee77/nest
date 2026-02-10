import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { AccessTokenGuard } from "../access-token/access-token.guard";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AUTH_TYPE_KEY } from "src/auth/constants/auth.constants";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]>;
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authType.map((type) => this.authTypeGuardMap[type]).flat();
    let error = new UnauthorizedException("Unauthorized");
    for (const instance of guards) {
      const canActive = await Promise.resolve().catch((err) => {
        error = err;
      });
    }
    throw true;
  }
}
