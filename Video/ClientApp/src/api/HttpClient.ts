import axios, { AxiosInstance } from 'axios';
import { IHttpClient, IHttpClientRequestParameters } from './IHttpClients';

class HttpClient implements IHttpClient {
    private axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.PUBLIC_URL,
            headers: {
                Pragma: 'no-cache',
                'Content-Type': 'application/json',
            }
        });

        this.axiosInstance.interceptors.response.use(
            res => res,
            err => {
                // TODO hanlde error
                console.log(err);
                throw new Error(err.response.data.message);
            }
        );
    }

    async get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        const res = await this.axiosInstance.get(parameters.url, {
            params: parameters.payload
        });
        return res.data;
    }

    async post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return (await this.axiosInstance.post(parameters.url, parameters.payload)).data;
    }

    async put<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return (await this.axiosInstance.put(parameters.url, parameters.payload)).data;
    }

    async delete<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return (await this.axiosInstance.delete(parameters.url, { params: parameters.payload })).data;
    }
}

export const httpClient = new HttpClient();
