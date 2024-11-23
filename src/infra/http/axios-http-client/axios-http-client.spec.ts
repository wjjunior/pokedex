import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { mockPostRequest } from "@/data/test";
import { mockAxios, mockHttpResponse } from "@/infra/test";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient<unknown, unknown>;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  test("Should call axios.post with correct URL and body", () => {
    const body = "test-body";
    const request = mockPostRequest<string>(body);

    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(request);

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });

  test("Should return the correct statusCode and body on failure", async () => {
    const { sut, mockedAxios } = makeSut();
    const mockResponse = mockHttpResponse();

    mockedAxios.post.mockRejectedValueOnce({
      response: mockResponse,
    });

    const response = await sut.post(mockPostRequest());
    expect(response).toEqual({
      statusCode: mockResponse.status,
      body: mockResponse.data,
    });
  });
});
