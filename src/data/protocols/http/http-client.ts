import { HttpPostParams } from ".";

export interface HttpClient {
  post<T, R>(params: HttpPostParams<T>): Promise<R>;
}
