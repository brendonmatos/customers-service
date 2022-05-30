import { Injectable } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Axios, { AxiosInstance } from "axios";
import { config } from "process";
import { AuthService } from "../customer/auth-service";


type KeycloakIntrospectionResponse = {
    exp:                number;
    iat:                number;
    jti:                string;
    iss:                string;
    sub:                string;
    typ:                string;
    azp:                string;
    preferred_username: string;
    email_verified:     boolean;
    acr:                string;
    resource_access:    ResourceAccess;
    scope:              string;
    clientId:           string;
    clientHost:         string;
    clientAddress:      string;
    client_id:          string;
    username:           string;
    active:             boolean;
}
export type ResourceAccess = {
    customers: Customers;
}

export type Customers = {
    roles: null[];
}

@Injectable()
export class AuthServiceKeycloak implements AuthService {
    httpClient: AxiosInstance;

    constructor(
        private configService: ConfigService
    ) {
        this.httpClient = Axios.create({
            baseURL: this.configService.get('SSO_KEYCLOAK_URL'),
        })
    }

    async validateToken(token: string): Promise<boolean> {

        const requestParams = new URLSearchParams({
            'client_id': this.configService.get('SSO_KEYCLOAK_CLIENT_ID'),
            'client_secret': this.configService.get('SSO_KEYCLOAK_CLIENT_SECRET'),
            'token': token,
        });

        const response = await this.httpClient.post<KeycloakIntrospectionResponse>('/token/introspect', requestParams, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const userInfo = response.data
        return userInfo.active
    }

    async getToken(): Promise<string> {
        const userName = this.configService.get('SSO_KEYCLOAK_USERNAME')
        const password = Buffer.from(userName).toString('base64')

        const requestParams = new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': this.configService.get('SSO_KEYCLOAK_CLIENT_ID'),
            'client_secret': this.configService.get('SSO_KEYCLOAK_CLIENT_SECRET'),
            'username': userName,
            'password': password,
            'scope': 'openid',
        })

        const response = await this.httpClient.post('/token', requestParams, {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })

        console.log(response.data)

        const token = response.data.access_token
        return token
    }
}