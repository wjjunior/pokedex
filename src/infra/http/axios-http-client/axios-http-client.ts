import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient<T, R>
  implements HttpPostClient<T, R>, HttpGetClient<T>
{
  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    let httpResponse: AxiosResponse<R>;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      const axiosError = error as { response: AxiosResponse<R> };
      httpResponse = axiosError.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }

  async get(params: HttpGetParams): Promise<HttpResponse<T>> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(params.url);
    } catch (error) {
      const axiosError = error as { response: AxiosResponse<R> };
      axiosResponse = axiosError.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
