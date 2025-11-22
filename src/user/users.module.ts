import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/user/providers/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}
