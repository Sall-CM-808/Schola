import type { AppProps } from "next/app";
import "../app/globals.css";
import "../app/animations.css";
import AppHeader from "@/components/layout/AppHeader";

export default function MyApp({ Component, pageProps }: AppProps) {
  const headerHeight = 64; // must match AppHeader height
  return (
    <>
      <AppHeader />
      <main
        style={{
          paddingTop: `${headerHeight}px`,
          paddingLeft: "var(--sidebar-width, 0px)",
          minHeight: "100vh",
        }}
        className="bg-[#0f4b51]"
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
