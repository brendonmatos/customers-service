import { CanActivate, ExecutionContext, HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { AuthService, InjectAuthService } from './customer/auth-service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectAuthService private authService: AuthService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const authorization = request.headers.authorization;
        if (!authorization) {
            return false
        }
        const [_, token] = authorization.split(' ');        
        const isValid = await this.authService.validateToken(token)
        console.log(token, isValid);
        return isValid
    }

}
