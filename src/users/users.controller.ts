import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetUserParamDto } from '../user/dto/get-user-param.dto';
import { UsersService } from '../user/providers/users.service';

// http:localhost:3000/users
@Controller('users')
export class UsersController {
  // Injecting Users Service
  constructor(private readonly usersService: UsersService) {}

  // http:localhost:3000/users?limit=10&page=1
  @Get('{/:id}')
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }
}
