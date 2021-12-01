import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	async validateUser(token: string) {
		console.log('token auth service', token);
		return {
			email: 'aaa'
		};
	}
}
