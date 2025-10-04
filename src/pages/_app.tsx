import type { AppProps } from "next/app";
import "../app/globals.css";
import "../app/animations.css";
import { UnitProvider } from "@/contexts/UnitContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UnitProvider>
      <Component {...pageProps} />
    </UnitProvider>
  );
}
