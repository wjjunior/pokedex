import React from "react";
import { Login } from "@/presentation/pages";
import { makeMockAuthentication } from "../../usecases/authentication/mock-authentication-factory";

export const makeLogin = () => {
  return <Login authentication={makeMockAuthentication()} />;
};
