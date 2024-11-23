"use client";

import { makeLogin } from "@/main/factories/pages/login/login-factory";
import React from "react";

export default function Login() {
  const LoginComponent = makeLogin();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {LoginComponent}
    </div>
  );
}
