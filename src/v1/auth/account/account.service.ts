import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    async validateBasicAuth(username: string, password: string) {
        const account = await this.prisma.accounts.findUnique({
            where: {
                username
            }
        });

        if (!account) {
            throw new UnauthorizedException("Username or password invalid");
        }

        const passwordMatch = await bcrypt.compare(password, account.password);

        if (!passwordMatch) {
            throw new UnauthorizedException("Username of password invalid");
        }

        const payload = {
            sub: account.id,
            username: account.username
        };

        const accessToken = await this.jwt.signAsync(payload);

        return {
            token: accessToken
        };
    }
}
