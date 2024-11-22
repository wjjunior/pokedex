import { HttpPostParams } from "@/data/protocols/http";
import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import chance from "chance";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const body = { key: "value" };
const mockPostRequest = (): HttpPostParams<typeof body> => ({
  url: chance().url(),
  body,
});

const makeSut = (): AxiosHttpClient<typeof body, { success: boolean }> => {
  return new AxiosHttpClient();
};

describe("AxiosHttpClient", () => {
  test("Should call axios.post with correct URL and body", async () => {
    const request = mockPostRequest();
    const axiosResponse = {
      status: 200,
      data: { success: true },
    };

    mockedAxios.post.mockResolvedValueOnce(axiosResponse);

    const sut = makeSut();
    const result = await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    expect(result).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });
});
