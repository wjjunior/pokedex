import { AccountModel } from "../models/account-model";
import { AuthenticationParams } from "../usecases/authentication";
import chance from "chance";

export const mockAuthentication = (): AuthenticationParams => ({
  email: chance().email(),
  password: chance().string({
    length: 12,
    pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~",
  }),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: chance().guid(),
});
