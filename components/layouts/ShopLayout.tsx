import { maxWidth, padding } from "@mui/system";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

const ShopLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="dscription" content={pageDescription} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      {/* <SideMenu /> */}

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0 30px",
        }}
      >
        {children}
      </main>

      <footer></footer>
    </>
  );
};

export default ShopLayout;
