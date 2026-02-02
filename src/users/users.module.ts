import { Module } from "@nestjs/common";
import { UsersControlelr } from "./users.controller";

@Module({
  controllers: [UsersControlelr],
})
export class UsersModule {}
