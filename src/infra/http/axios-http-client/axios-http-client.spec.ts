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

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
describe("AxiosHttpClient", () => {
  test("Should call axios.post with correct URL and body", async () => {
    const request = mockPostRequest();
    const response = { data: { success: true } };

    mockedAxios.post.mockResolvedValueOnce(response);

    const sut = makeSut();
    const result = await sut.post<typeof body, typeof response.data>({
      url: request.url,
      body: request.body,
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    expect(result).toEqual(response.data);
  });
});
