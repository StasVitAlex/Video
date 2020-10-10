export interface IHttpClientRequestParameters<T> {
    url: string
    payload?: T
}

export interface IHttpClient {
    get<T, TResult>(parameters: IHttpClientRequestParameters<T>): Promise<TResult>
    post<T, TResult>(parameters: IHttpClientRequestParameters<T>): Promise<TResult>
    put<T, TResult>(parameters: IHttpClientRequestParameters<T>): Promise<TResult>
    delete<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
}
