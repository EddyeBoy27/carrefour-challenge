import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passValid = await bcrypt.compare(password, user.password);
    if (user.email === email && passValid) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    if (!user) {
      throw new UnauthorizedException('Credenciais Inválidas.');
    }

    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
