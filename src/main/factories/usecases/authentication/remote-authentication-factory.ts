import { makeApiUrl } from "@/main/factories/http/api-url-factory";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(
    makeApiUrl("/login"),
    makeAxiosHttpClient<AuthenticationParams, AccountModel>(),
  );
};
