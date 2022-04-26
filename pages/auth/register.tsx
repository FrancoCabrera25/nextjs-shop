import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { AuthLayout } from "../../components/layouts";
import NextLink from "next/link";

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title="Registrarse">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            sx={{ my: 2 }}
          >
            <Typography variant="h1" component="h1">
              Crear Cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Registrarse
            </Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/login" passHref>
              <Link underline='always'>¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
