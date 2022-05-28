import { Subtitles } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { maxWidth, padding } from "@mui/system";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { AdminNavbar } from "../admin";
import { SideMenu } from "../ui";

interface Props {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
}

const AdminLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  subTitle,
  icon,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <meta name="dscription" content={pageDescription} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />} */}
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0 30px",
        }}
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Typography sx={{ mr: 1 }} variant="h1" component="h1">
              {icon}
            </Typography>
            <Typography variant="h1" component="h1">
              {title}
            </Typography>
          </Box>

          <Typography variant="h2" sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};

export default AdminLayout;
