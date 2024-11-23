import { Authentication } from "@/domain/usecases";
import { MockAuthentication } from "@/main/test";

export const makeMockAuthentication = (): Authentication => {
  return new MockAuthentication();
};
