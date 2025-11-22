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
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserParamDto } from './dto/get-user-param.dto';
import { PatchUserDto } from './dto/patch-user.dto';

// http:localhost:3000/users
@Controller('users')
export class UsersController {
  //   @Get('/:id')
  //   public getUsers(@Param() params: { id: string }, @Query() query: any) {
  //     console.log(params);
  //     console.log(query);
  //     return `your send Get request to user: with ID: ${params.id}`;
  //   }
  @Get('/:id')
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto,
    // @Param('optional') optional: string,
    // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log({ getUserParamDto });
    return `your send Get request to user endpoint `;
  }
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);

    return 'Here is post request';
  }
  @Patch()
  public patchUSer(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
