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

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findOneByEmail(email);
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

	async login(user) {
		console.log('inside authservice.login');
		const payload = { email: user.email, sub: user.id };
		console.log(payload);
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
