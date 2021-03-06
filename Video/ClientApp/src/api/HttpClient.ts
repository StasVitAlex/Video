import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {IHttpClient, IHttpClientRequestParameters} from './IHttpClients';
import {AuthHelper} from 'components/auth/Auth.helper';
import {notificationService, NotificationType} from 'services/Notification.service';

class HttpClient implements IHttpClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: `${process.env.PUBLIC_URL}/api`,
            headers: {
                Pragma: 'no-cache',
                'Content-Type': 'application/json'
            }
        });

        // set auth
        this.client.interceptors.request.use((config) => {
            const token = AuthHelper.token;
            config.headers.Authorization = token ? `Bearer ${token}` : '';
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
        notificationService.send(NotificationType.error, eror.response.data.message);
        throw new Error(eror.response.data.message);
    }

    async get<T, TResult>(parameters: IHttpClientRequestParameters<T>): Promise<TResult> {
        const res = await this.client.get(parameters.url, {
            params: parameters.payload
        });
        return res?.data;
    }

    async post<T, TResult>(parameters: IHttpClientRequestParameters<T>): Promise<TResult> {
        return (await this.client.post(parameters.url, parameters.payload, parameters.config))?.data;
    }

    async put<T, TResult>(parameters: IHttpClientRequestParameters<T>): Promise<TResult> {
        return (await this.client.put(parameters.url, parameters.payload))?.data;
    }

    async delete<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return (await this.client.delete(parameters.url, {params: parameters.payload}))?.data;
    }
}

export const httpClient = new HttpClient();
