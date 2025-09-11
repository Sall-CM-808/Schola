import type { AppProps } from "next/app";
import "../app/globals.css";
import "../app/animations.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
