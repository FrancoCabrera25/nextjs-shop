import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { AuthLayout } from "../../components/layouts";
import NextLink from 'next/link';

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} display= 'flex' justifyContent='center' sx= {{ my: 2 }}>
            <Typography variant="h1" component="h1">
              Iniciar Sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button color="secondary" className="circular-btn" size="large" fullWidth>
              Ingresar
            </Button>
          </Grid>

          <Grid item xs={12} display='flex' justifyContent='end'>
           <NextLink href='/auth/register' passHref>
            <Link underline='always'>
            ¿No tienes cuenta?
            </Link>
           </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
