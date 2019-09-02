import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	handle: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 32)
	password: string;
}
