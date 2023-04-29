import Frame from "@/components/Frame";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "normalize.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Frame />
      <Component {...pageProps} />
    </>
  );
}
