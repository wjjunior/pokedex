import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import chance from "chance";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
describe("AxiosHttpClient", () => {
  test("Should call axios.post with correct URL and body", async () => {
    const url = chance().url();
    const body = { key: "value" };
    const response = { data: { success: true } };

    mockedAxios.post.mockResolvedValueOnce(response);

    const sut = makeSut();
    const result = await sut.post<typeof body, typeof response.data>({
      url,
      body,
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
    expect(result).toEqual(response.data);
  });
});
