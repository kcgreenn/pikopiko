import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { ReplyModule } from './reply/reply.module';
import * as dotenv from 'dotenv';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { UsersService } from './users/users.service';
dotenv.config();

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'client', 'build', 'index.html'),
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			username: process.env.DB_USER,
			password: process.env.DB_PW,
			port: +process.env.DB_PORT,
			database: process.env.DB_NAME,
			entities: [join(__dirname, '**/*.entity{.ts,.js}')],
			synchronize: true,
		}),
		AuthModule,
		UsersModule,
		ProfileModule,
		PostModule,
		ReplyModule,
	],
	controllers: [AppController, UsersController, ProfileController],
	providers: [AppService],
	exports: [AuthModule, UsersModule, ProfileModule],
})
export class AppModule {}
