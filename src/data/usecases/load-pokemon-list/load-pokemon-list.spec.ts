import { HttpGetClientSpy } from "@/data/test";
import chance from "chance";
import { LoadPokemonList } from "./load-pokemon-list";
import { HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";

type SutTypes = {
  sut: LoadPokemonList;
  httpGetClientSpy: HttpGetClientSpy<LoadPokemonList>;
};
const makeSut = (url = chance().url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<LoadPokemonList>();
  const sut = new LoadPokemonList(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe("LoadPokemonList", () => {
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
});
