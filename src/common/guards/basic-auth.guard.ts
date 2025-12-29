import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new UnauthorizedException('Missing basic authorization');
        }

        const base64Credentials = authHeader.replace('Basic ', '').trim();

        let decoded: string;
        try {
            decoded = Buffer.from(base64Credentials, 'base64').toString('utf8');
        } catch {
            throw new UnauthorizedException('Invalid basic authorization format');
        }

        const [username, password] = decoded.split(':');

        if (!username || !password) {
            throw new UnauthorizedException('Invalid basic authorization value');
        }

        const account = await this.prisma.accounts.findUnique({
            where: { username },
        });

        if (!account) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordValid = await bcrypt.compare(password, account.password);

        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // inject user ke request
        request.user = {
            id: account.id,
            username: account.username,
        };

        return true;
    }
}
