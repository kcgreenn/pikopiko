import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.findOneByName(username);

		if (user) {
			// Compare hashed passwords
			const isMatch = await compare(password, user.password);
			if (isMatch) {
				// return user data minus password
				const { password, ...result } = user;
				return result;
			}
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.name, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
