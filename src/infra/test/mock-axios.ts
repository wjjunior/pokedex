import axios from "axios";
import chance from "chance";

const Chance = new chance.Chance();

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue({
    data: {
      [Chance.string({ length: 5 })]: Chance.string(),
      [Chance.string({ length: 5 })]: Chance.integer(),
    },
    status: Chance.integer({ min: 200, max: 599 }),
  });
  return mockedAxios;
};
