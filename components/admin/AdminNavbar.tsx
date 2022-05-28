
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useContext, } from "react";
import { UiContext } from "../../context";



const AdminNavbar: FC = () => {

  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
