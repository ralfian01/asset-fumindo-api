import { Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('auth/account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Post()
    async loginAccount(@Headers('authorization') authHeader?: string) {
        if (!authHeader || !authHeader.startsWith("Basic ")) {
            throw new UnauthorizedException("Missing Authorization header");
        }

        const base64Credentials = authHeader.replace("Basic ", "");
        const decoded = Buffer.from(base64Credentials, 'base64').toString('utf-8');

        const [username, password] = decoded.split(':');

        if (!username || !password) {
            throw new UnauthorizedException("Username or password invalid");
        }

        return this.accountService.validateBasicAuth(username, password);
    }
}
