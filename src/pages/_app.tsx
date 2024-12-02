import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import { theme } from "@/presentation/theme/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
