import { Injectable } from "@nestjs/common";
import { AuthService } from "../customer/auth-service";

@Injectable()
export class AuthServiceMock implements AuthService {

    tokens : string[] = [];

    validateToken(token: string): Promise<boolean> {
        return Promise.resolve(this.tokens.includes(token))
    }
    getToken(): Promise<string> {
        const token = `${Date.now()}`
        this.tokens.push(token);
        return Promise.resolve(token);
    }
}