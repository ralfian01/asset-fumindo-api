import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }

    async use(
        req: Request & { user?: any; },
        res: Response,
        next: NextFunction,
    ) {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing bearer token');
        }

        const token = authHeader.replace('Bearer ', '').trim();

        try {
            const payload = await this.jwtService.verifyAsync(token);
            req.user = payload; // attach ke request
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
