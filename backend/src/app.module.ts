import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';

import { User } from './user/user.entity';
import { Blog } from './blogs/blogs.entity';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST,

      port: Number(process.env.DB_PORT),

      username: process.env.DB_USER,

      password: process.env.DB_PASSWORD,

      database: process.env.DB_NAME,

      entities: [User, Blog],

      synchronize: true,
    }),

    AuthModule,
    UserModule,
    BlogsModule,

  ],
})
export class AppModule {}