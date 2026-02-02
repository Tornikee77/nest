import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreaterUserDto } from "./dtos/create-user.dto";
import { GetusersParamDto } from "./dtos/get-users-param.dto";
import { PatchUserDto } from "./dtos/patch-user.dto";

// http:localhost:3000/users
@Controller("users")
export class UsersControlelr {
  // Get request - http:localhost:3000/users/20000/new - "You send Get Request"

  // Get request - http:localhost:3000/users/20000?limit=20&sort=desc - "You send Get Request"

  // @Get("/:id?")
  // @Get("{/:id}")
  // @Get("/:id")
  // public getusers(
  //   @Param() params: { id: string },
  //   @Query() query: Record<string, string>,
  // ) {
  //   console.log(params);
  //   console.log("this is Query:", query);
  //   return `You send a Get Request to User with ID : ${params.id}`;
  // }

  // @Param("optional") optional: string,
  // @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  // @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,

  @Get("{/:id}")
  public getUsers(@Param() getUserParamDto: GetusersParamDto) {
    console.log(getUserParamDto);
    return `you sent a get request to users endpoint`;
  }

  //                      body-ში არსებული data
  @Post()
  public createUser(@Body() createrUserDto: CreaterUserDto) {
    // console.log(createrUserDto instanceof CreaterUserDto);
    console.log(createrUserDto);
    return `Here is your post request`;
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
