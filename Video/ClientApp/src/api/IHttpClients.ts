export interface IHttpClientRequestParameters<T> {
    url: string
    payload?: T
}

export interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
    post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
    put<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
    delete<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
}
