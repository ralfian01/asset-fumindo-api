import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        return next.handle().pipe(
            map((data) => {
                const statusCode = response.statusCode;

                return {
                    code: statusCode,
                    status: 'SUCCESS',
                    description: this.getDescription(statusCode),
                    data: data ?? null,
                };
            }),
        );
    }

    private getDescription(code: number): string {
        switch (code) {
            case 200:
                return 'Request success';
            case 201:
                return 'Insert data success';
            case 204:
                return 'Delete data success';
            default:
                return 'Operation success';
        }
    }
}
