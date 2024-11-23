import { PokemonListModel } from "@/domain/models";

export interface LoadSurveyList {
  load: () => Promise<PokemonListModel[]>;
}
