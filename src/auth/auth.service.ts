import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByHandle(username);
    if (user) {
      const passwordsMatch = await compare(password, user.password);
      if (passwordsMatch) {
        const { password, ...result } = user;
        return result;
      }
      throw new HttpException('Password incorrect', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Handle not found', HttpStatus.UNAUTHORIZED);
  }

  async login(user: any) {
    const payload = { handle: user.handle, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
