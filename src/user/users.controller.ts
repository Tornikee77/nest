import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  //   @Get('/:id')
  //   public getUsers(@Param() params: { id: string }, @Query() query: any) {
  //     console.log(params);
  //     console.log(query);
  //     return `your send Get request to user: with ID: ${params.id}`;
  //   }
  @Get('/:id/:optional')
  public getusers(
    @Param('id') id: string,
    @Param('optional') optional: string,
    @Query('limit') limit: string,
    @Query('sort') sort: string,
  ) {
    console.log({ id, optional, limit, sort });
    return `your send Get request to user: with ID: `;
  }
  @Post()
  public createUser(
    @Body() request: any,
    @Headers() headers: any,
    @Ip() ip: string,
  ) {
    console.log(request);
    console.log(headers);
    console.log(ip);
    return 'Here is post request';
  }
}
