import { HttpGetClientSpy } from "@/data/test";
import chance from "chance";
import { RemoteLoadPokemonList } from "./remote-load-pokemon-list";
import { HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { PokemonListModel } from "@/domain/models";
import { mockPokemonListModel } from "@/domain/test/mock-pokemon-list";
import { LoadPokemonListParams } from "@/domain/usecases";

type SutTypes = {
  sut: RemoteLoadPokemonList;
  httpGetClientSpy: HttpGetClientSpy<LoadPokemonListParams, PokemonListModel>;
};
const makeSut = (url = chance().url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<
    LoadPokemonListParams,
    PokemonListModel
  >();
  const sut = new RemoteLoadPokemonList(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe("RemoteLoadPokemonList", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const url = chance().url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test("Should throw UnexpectedError if HttpGetClient returns 403", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpGetClient returns 404", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpGetClient returns 500", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return a Pokemon list if HttpGetClient returns 200", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockPokemonListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const surveyList = await sut.load();
    expect(surveyList).toEqual(httpResult);
  });
});
