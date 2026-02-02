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
import { GetUserParamDto } from './dto/get-user-param.dto';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// http:localhost:3000/users
@Controller('users')
@ApiTags('users')
export class UsersController {
  // Injecting Users Service
  constructor(private readonly usersService: UsersService) {}

  // http:localhost:3000/users?limit=10&page=1
  @Get('{/:id}')
  @ApiOperation({ summary: 'Fetches a list of registered users' })
  @ApiQuery({
    name: 'limit',
    type: String,
    description: 'The upper limit of page you want to pagination to return',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'The position of page you want to pagination to return',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'List of users fetched successfully.',
  })
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'here is a post request';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
