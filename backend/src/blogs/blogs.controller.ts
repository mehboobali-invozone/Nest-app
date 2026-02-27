import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('api/bloges')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Post()
  create(@Body() body) {
    return this.blogService.create(body);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.blogService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.blogService.delete(id);
  }
}