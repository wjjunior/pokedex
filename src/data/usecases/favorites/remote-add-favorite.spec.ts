import { HttpPostClientSpy } from "@/data/test";
import chance from "chance";
import { HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { ApiSuccessModel } from "@/domain/models";
import { FavoritePokemonParams } from "@/domain/usecases";
import { RemoteAddFavorite } from "./remote-add-favorite";

type SutTypes = {
  sut: RemoteAddFavorite;
  httpPostClientSpy: HttpPostClientSpy<FavoritePokemonParams, ApiSuccessModel>;
};

const makeSut = (url = chance().url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    FavoritePokemonParams,
    ApiSuccessModel
  >();
  const sut = new RemoteAddFavorite(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAddFavorite", () => {
  test("Should call HttpPostClient with correct URL and body", async () => {
    const url = chance().url();
    const { sut, httpPostClientSpy } = makeSut(url);
    const params = { pokemonId: chance().integer({ min: 1 }) };

    await sut.addFavorite(params);

    expect(httpPostClientSpy.url).toBe(url);
    expect(httpPostClientSpy.body).toEqual(params);
  });

  test("Should throw UnexpectedError if HttpPostClient returns 403", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.addFavorite({
      pokemonId: chance().integer({ min: 1 }),
    });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.addFavorite({
      pokemonId: chance().integer({ min: 1 }),
    });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return ApiSuccessModel if HttpPostClient returns 200", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = { success: true };
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const result = await sut.addFavorite({
      pokemonId: chance().integer({ min: 1 }),
    });

    expect(result).toEqual(httpResult);
  });
});
