import { CanActivate, ExecutionContext, HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { AuthService, InjectAuthService } from './customer/auth-service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectAuthService private authService: AuthService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("-------->>>>>>>>")
        const http = context.switchToHttp();
        const request = http.getRequest();
        // const response = http.getResponse();

        if (!request.headers.authorization) {
            return false
        }

        const [_, token] = request.headers.authorization.split(' ');        
        const isValid = await this.authService.validateToken(token)
        Logger.log(`AuthGuard: ${isValid}`, 'AuthGuard')
        return isValid
    }
}
