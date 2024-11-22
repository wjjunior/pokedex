import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { mockPostRequest } from "@/data/test";
import { mockAxios } from "@/infra/test";

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
});
