import React, { FC, ReactNode } from "react";
import Head from "next/head";
import { Header } from "../components/Header";

interface Iprops {
  title: string;
  children: ReactNode;
}
export const Layout: FC<Iprops> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Yevamelo"}</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};
