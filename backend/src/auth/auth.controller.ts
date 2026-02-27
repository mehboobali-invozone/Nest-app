import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('api/auth')
export class AuthController {

constructor(private authService: AuthService){}

@Post("register")
register(@Body() dto: RegisterUserDto) {
  return this.authService.register(dto);
}

@Post("login")
login(@Body() body: any) {
  return this.authService.login(body);
}

}