import chance from "chance";
import { AccountModel } from "../models";

export const mockAccountModel = (): AccountModel => ({
  accessToken: chance().guid(),
});
