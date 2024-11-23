import { HttpGetClientSpy } from "@/data/test";
import chance from "chance";
import { LoadPokemonList } from "./load-pokemon-list";

type SutTypes = {
  sut: LoadPokemonList;
  httpGetClientSpy: HttpGetClientSpy;
};
const makeSut = (url = chance().url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new LoadPokemonList(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe("RemoteLoadSurveyList", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const url = chance().url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
