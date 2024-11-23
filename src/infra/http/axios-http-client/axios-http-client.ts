import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient<T, R>
  implements HttpPostClient<T, R>, HttpGetClient<T, R>
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

  async get(params: HttpGetParams<T>): Promise<HttpResponse<R>> {
    let axiosResponse: AxiosResponse<R>;
    try {
      const fullUrl = `${params.url}${params.pathParams && params.pathParams.length > 0 ? `/${params.pathParams.join("/")}` : ""}`;

      axiosResponse = await axios.get(fullUrl, {
        params: params.queryParams,
      });
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
