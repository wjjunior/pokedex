import { HttpPostParams } from "@/data/protocols/http";
import { HttpClient } from "@/data/protocols/http/http-client";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpClient {
  async post<T, R>(params: HttpPostParams<T>): Promise<R> {
    const response: AxiosResponse<R> = await axios.post<R>(
      params.url,
      params.body,
    );
    return response.data;
  }
}
