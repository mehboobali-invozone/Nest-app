import { Controller, Post, Get, Put, Delete, Param, Body,Req,UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/bloges')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

 @Post()
@UseGuards(AuthGuard('jwt'))
create(@Req() req, @Body() body) {
  console.log("REQ.USER:", req.user);       // check if JWT user is present
  console.log("BODY:", body);               // check what frontend sent
const blogData = {
  ...body,
  author_name: `User-${req.user.name}` 
};
console.log(blogData)
return this.blogService.create(blogData);
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