import Axios, { AxiosInstance } from "axios";
import { AuthService } from "../customer/auth-service";

export class AuthServiceKeycloak implements AuthService {
    httpClient: AxiosInstance;

    constructor() {
        this.httpClient = Axios.create({
            baseURL: 'https://accounts.seguros.vitta.com.br/'
        })
    }

    async validateToken(token: string): Promise<boolean> {
        // try {
        //     const response = await this.httpClient.get('/auth/realms/careers/protocol/openid-connect/userinfo', {
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     })

        //     console.log(response.data)
        //     const userInfo = response.data
        //     return userInfo.active
        // } catch (error) {
        //     console.log(error.response.data)
        //     return false
        // }

        return true

    }
    async getToken(): Promise<string> {
        const userName = 'brendonferreiradm@gmail.com'
        const password = Buffer.from(userName).toString('base64')

        const requestParams = new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': 'customers',
            'client_secret': '453000f7-47a0-4489-bc47-891c742650e2',
            'username': userName,
            'password': password,
            'scope': 'openid',
        })

        const response = await this.httpClient.post('/auth/realms/careers/protocol/openid-connect/token', requestParams.toString(), {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })

        const token = response.data.access_token
        return token
    }
}