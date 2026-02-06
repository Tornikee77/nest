import { Injectable } from "@nestjs/common";
import { HashingProvider } from "./hashing.provider";
import * as bycript from "bcrypt";

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // generate the salt
    const salt = await bycript.genSalt();
    return bycript.hash(data, salt);
  }
  public async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return bycript.compare(data, encrypted);
  }
}
