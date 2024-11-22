import { HttpPostParams } from "../protocols/http";
import chance from "chance";

export const mockPostRequest = <T = unknown>(body?: T): HttpPostParams<T> => ({
  url: chance().url(),
  body,
});
