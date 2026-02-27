import { UserRole } from "../../user/user.entity";

export class RegisterUserDto {

 name: string;

 email: string;

 password: string;

 role?: UserRole;   // ✅ FIX
}