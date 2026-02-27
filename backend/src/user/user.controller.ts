import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get')
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}