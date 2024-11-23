import React from "react";
import { Login } from "@/presentation/pages";
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";

export const makeLogin = () => {
  return <Login authentication={makeRemoteAuthentication()} />;
};
