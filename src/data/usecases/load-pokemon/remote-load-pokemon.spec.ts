import { HttpGetClientSpy } from "@/data/test";
import chance from "chance";
import { HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { PokemonModel } from "@/domain/models";
import { LoadPokemonParams } from "@/domain/usecases";
import { RemoteLoadPokemon } from "./remote-load-pokemon";
import { mockPokemon } from "@/domain/test";

type SutTypes = {
  sut: RemoteLoadPokemon;
  httpGetClientSpy: HttpGetClientSpy<LoadPokemonParams, PokemonModel>;
};
const makeSut = (url = chance().url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<
    LoadPokemonParams,
    PokemonModel
  >();
  const sut = new RemoteLoadPokemon(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe("RemoteLoadPokemon", () => {
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

  test("Should return null if HttpGetClient returns 404", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = await sut.load();
    await expect(promise).toBeNull();
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
    const httpResult = mockPokemon();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const surveyList = await sut.load();
    expect(surveyList).toEqual(httpResult);
  });
});
