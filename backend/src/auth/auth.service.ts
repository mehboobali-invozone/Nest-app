
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm'; import { User, UserRole } from '../user/user.entity'; 
import { Repository } from 'typeorm'; 
import * as bcrypt from 'bcryptjs'; 
import { JwtService } from '@nestjs/jwt'; 
import { RegisterUserDto } from './dto/registerUser.dto'; 
@Injectable() 
export class AuthService { constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService,) { } 
async register(dto: RegisterUserDto) { const existingUser = await this.userRepo.findOne({ where: { email: dto.email } }); 
if (existingUser) { throw new BadRequestException("Email already exists"); 

} 
const hashedPassword = await bcrypt.hash(dto.password, 10);
 const user = this.userRepo.create({ 
  name: dto.name, 
  email: dto.email, 
  password: hashedPassword, 
  role: dto.role || UserRole.Editor });
  const savedUser = await this.userRepo.save(user); const token = this.jwtService.sign({ id: savedUser.id, role: savedUser.role, }); 
  return { token, user: { 
    id: savedUser.id,
     name: savedUser.name, 
     email: savedUser.email, 
     role: savedUser.role } }; 
} 
async login(body: any) 
{ const user = await this.userRepo.findOne({ where: { email: body.email } });
if (!user) { throw new UnauthorizedException("Invalid email"); } const match = await bcrypt.compare(body.password, user.password);
 if (!match) { throw new UnauthorizedException("Invalid password"); } const token = this.jwtService.sign({ id: user.id, role: user.role });
 return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }; } }