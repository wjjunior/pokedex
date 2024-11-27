import { HttpDeleteClientSpy, HttpPostClientSpy } from "@/data/test";
import chance from "chance";
import { HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { ApiSuccessModel } from "@/domain/models";
import { FavoritePokemonParams } from "@/domain/usecases";
import { RemoteFavorites } from "./remote-favorites";

type SutTypes = {
  sut: RemoteFavorites;
  httpPostClientSpy: HttpPostClientSpy<FavoritePokemonParams, ApiSuccessModel>;
  httpDeleteClientSpy: HttpDeleteClientSpy<
    FavoritePokemonParams,
    ApiSuccessModel
  >;
};

const makeSut = (url = chance().url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    FavoritePokemonParams,
    ApiSuccessModel
  >();
  const httpDeleteClientSpy = new HttpDeleteClientSpy<
    FavoritePokemonParams,
    ApiSuccessModel
  >();
  const sut = new RemoteFavorites(url, httpPostClientSpy, httpDeleteClientSpy);
  return {
    sut,
    httpPostClientSpy,
    httpDeleteClientSpy,
  };
};

describe("RemoteFavorites", () => {
  describe("add", () => {
    test("Should call HttpPostClient with correct URL and body", async () => {
      const url = chance().url();
      const { sut, httpPostClientSpy } = makeSut(url);
      const params = { pokemonId: chance().integer({ min: 1 }) };

      await sut.add(params);

      expect(httpPostClientSpy.url).toBe(url);
      expect(httpPostClientSpy.body).toEqual(params);
    });

    test("Should throw UnexpectedError if HttpPostClient returns 403", async () => {
      const { sut, httpPostClientSpy } = makeSut();
      httpPostClientSpy.response = {
        statusCode: HttpStatusCode.forbidden,
      };

      const promise = sut.add({
        pokemonId: chance().integer({ min: 1 }),
      });

      await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test("Should throw UnexpectedError if HttpPostClient returns 500", async () => {
      const { sut, httpPostClientSpy } = makeSut();
      httpPostClientSpy.response = {
        statusCode: HttpStatusCode.serverError,
      };

      const promise = sut.add({
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

      const result = await sut.add({
        pokemonId: chance().integer({ min: 1 }),
      });

      expect(result).toEqual(httpResult);
    });
  });
  describe("remove", () => {
    test("Should call HttpDeleteClient with correct URL", async () => {
      const url = chance().url();
      const { sut, httpDeleteClientSpy } = makeSut(url);
      const params = { pokemonId: chance().integer({ min: 1 }) };

      await sut.remove(params);

      expect(httpDeleteClientSpy.url).toBe(`${url}/${params.pokemonId}`);
    });

    test("Should throw UnexpectedError if HttpDeleteClient returns 403", async () => {
      const { sut, httpDeleteClientSpy } = makeSut();
      httpDeleteClientSpy.response = {
        statusCode: HttpStatusCode.forbidden,
      };

      const promise = sut.remove({
        pokemonId: chance().integer({ min: 1 }),
      });

      await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test("Should throw UnexpectedError if HttpDeleteClient returns 500", async () => {
      const { sut, httpDeleteClientSpy } = makeSut();
      httpDeleteClientSpy.response = {
        statusCode: HttpStatusCode.serverError,
      };

      const promise = sut.remove({
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

      const result = await sut.remove({
        pokemonId: chance().integer({ min: 1 }),
      });

      expect(result).toEqual(httpResult);
    });
  });
});
