import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blogs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,
  ) {}

  create(data: Partial<Blog>) {
    const blog = this.blogRepo.create(data);
    return this.blogRepo.save(blog);
  }

  findAll() {
    return this.blogRepo.find();
  }

  async update(id: number, data: Partial<Blog>) {
    await this.blogRepo.update(id, data);
    return this.blogRepo.findOne({ where: { id } });
  }

  delete(id: number) {
    return this.blogRepo.delete(id);
  }
}