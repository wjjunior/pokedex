import { HttpDeleteClientSpy } from "@/data/test";
import chance from "chance";
import { HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { ApiSuccessModel } from "@/domain/models";
import { FavoritePokemonParams } from "@/domain/usecases";
import { RemoteRemoveFavorite } from "./remote-remove-favorite";

type SutTypes = {
  sut: RemoteRemoveFavorite;
  httpDeleteClientSpy: HttpDeleteClientSpy<
    FavoritePokemonParams,
    ApiSuccessModel
  >;
};

const makeSut = (url = chance().url()): SutTypes => {
  const httpDeleteClientSpy = new HttpDeleteClientSpy<
    FavoritePokemonParams,
    ApiSuccessModel
  >();
  const sut = new RemoteRemoveFavorite(url, httpDeleteClientSpy);
  return {
    sut,
    httpDeleteClientSpy,
  };
};

describe("RemoteRemoveFavorite", () => {
  test("Should call HttpDeleteClient with correct URL", async () => {
    const url = chance().url();
    const { sut, httpDeleteClientSpy } = makeSut(url);
    const params = { pokemonId: chance().integer({ min: 1 }) };

    await sut.removeFavorite(params);

    expect(httpDeleteClientSpy.url).toBe(`${url}/${params.pokemonId}`);
  });

  test("Should throw UnexpectedError if HttpDeleteClient returns 403", async () => {
    const { sut, httpDeleteClientSpy } = makeSut();
    httpDeleteClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.removeFavorite({
      pokemonId: chance().integer({ min: 1 }),
    });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpDeleteClient returns 500", async () => {
    const { sut, httpDeleteClientSpy } = makeSut();
    httpDeleteClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.removeFavorite({
      pokemonId: chance().integer({ min: 1 }),
    });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return ApiSuccessModel if HttpDeleteClient returns 204", async () => {
    const { sut, httpDeleteClientSpy } = makeSut();
    const httpResult = { success: true };
    httpDeleteClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body: httpResult,
    };

    const result = await sut.removeFavorite({
      pokemonId: chance().integer({ min: 1 }),
    });

    expect(result).toEqual(httpResult);
  });
});
