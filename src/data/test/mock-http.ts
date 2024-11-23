import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from "../protocols/http";
import chance from "chance";

export const mockPostRequest = <T = unknown>(body?: T): HttpPostParams<T> => ({
  url: chance().url(),
  body,
});

export const mockGetRequest = <T = unknown>(
  params?: T,
  pathParams?: string[],
): HttpGetParams<T> => ({
  url: chance().url(),
  queryParams: params,
  pathParams,
});

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };
  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<T, R> implements HttpGetClient<T, R> {
  url?: string;
  pathParams?: string[];
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams<T>): Promise<HttpResponse<R>> {
    const fullUrl = `${params.url}${params.pathParams && params.pathParams.length > 0 ? `/${params.pathParams.join("/")}` : ""}`;
    this.url = fullUrl;
    this.pathParams = params.pathParams;
    return this.response;
  }
}
