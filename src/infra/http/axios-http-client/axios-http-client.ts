import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient<T, R> implements HttpPostClient<T, R> {
  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const httpResponse: AxiosResponse<R> = await axios.post(
      params.url,
      params.body,
    );
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
