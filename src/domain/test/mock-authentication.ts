import { AuthenticationParams } from "../usecases/authentication";
import chance from "chance";

export const mockAuthentication = (): AuthenticationParams => ({
  email: chance().email(),
  password: chance().string({
    length: 12,
    pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~",
  }),
});
