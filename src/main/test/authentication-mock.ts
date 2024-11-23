import { AccountModel } from "@/domain/models";
import { Authentication, AuthenticationParams } from "@/domain/usecases";

export class MockAuthentication implements Authentication {
  account = { accessToken: "mocked-access-token" } as AccountModel;
  params?: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.account), 2000);
    });
  }
}
