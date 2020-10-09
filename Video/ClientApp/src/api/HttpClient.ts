import axios, { AxiosInstance } from 'axios';
import { IHttpClient, IHttpClientRequestParameters } from './IHttpClients';
import { AuthHelper } from 'components/auth/Auth.helper';
import { notificationService, NotificationType } from 'services/Notification.service';

class HttpClient implements IHttpClient {
    private client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: process.env.PUBLIC_URL,
            headers: {
                Pragma: 'no-cache',
                'Content-Type': 'application/json'
            }
        });

        // set auth
        this.client.interceptors.request.use((config) => {
            const token = AuthHelper.token;
            config.headers.Authorization =  token ? `Bearer ${token}` : '';
            return config;
        });

        this.client.interceptors.response.use(
            res => res, this.handleError);
    }

    private handleError(eror: any): void {
        if (eror.status === 401) {
            AuthHelper.logOut();
            return;
        }

        // TODO hanlde error
        console.log(JSON.stringify(eror));
        // TODO send when client error
        // notificationService.send(NotificationType.error, eror.response.data.message);
        throw new Error(eror.response.data.message);
    }

    async get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        const res = await this.client.get(parameters.url, {
            params: parameters.payload
        });
        return res.data;
    }

    async post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return (await this.client.post(parameters.url, parameters.payload)).data;
    }

    async put<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return (await this.client.put(parameters.url, parameters.payload)).data;
    }

    async delete<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return (await this.client.delete(parameters.url, { params: parameters.payload })).data;
    }
}

export const httpClient = new HttpClient();
