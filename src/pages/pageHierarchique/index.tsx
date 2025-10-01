import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/pageHierarchique/isma",
      permanent: false,
    },
  };
};

export default function RedirectToIsma() {
  return null;
}
