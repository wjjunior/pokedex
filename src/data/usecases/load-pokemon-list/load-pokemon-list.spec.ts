import { HttpGetClientSpy } from "@/data/test";
import chance from "chance";
import { LoadPokemonList } from "./load-pokemon-list";

describe("RemoteLoadSurveyList", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const url = chance().url();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new LoadPokemonList(url, httpGetClientSpy);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
