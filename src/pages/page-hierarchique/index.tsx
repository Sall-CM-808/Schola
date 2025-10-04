import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/isma",
      permanent: false,
    },
  };
};

export default function RedirectToIsma() {
  return null;
}
