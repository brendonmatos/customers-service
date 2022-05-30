import { Inject } from "@nestjs/common";

export const AuthServiceSymbol = Symbol('AuthService');

export const ProvideAuthService = (authService: AuthService) => {
    return {
        provide: AuthServiceSymbol,
        useValue: authService,
    }
}

export const InjectAuthService = Inject(AuthServiceSymbol);

export interface AuthService {
    validateToken(token: string): Promise<boolean>;
    getToken(): Promise<string>;
}