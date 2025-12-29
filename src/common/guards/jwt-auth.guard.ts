import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing bearer token');
        }

        const token = authHeader.replace('Bearer ', '').trim();

        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = payload; // inject ke request
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
