import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { AuthLayout } from "../../components/layouts";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { shopApi } from "../../api";
import { ErrorOutlined } from "@mui/icons-material";
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { useRouter } from 'next/router';

type FormInputs = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onLoginUser = async ({ email, password }: FormInputs) => {
    setShowError(false);
    const validLogin = await login(email, password);

    if(!validLogin){
      setShowError(true);
      setTimeout(()=>{setShowError(false)},3000);

      return;
    }
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              flexDirection='column'
              alignItems='center'
              sx={{ my: 2 }}
            >
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              <Chip sx={{ mt:2, display: showError ? 'flex' : 'none' }} label='los datos ingresados son incorrectos' color='error' icon={ <ErrorOutlined />} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                {...register("email", {
                  required: "El email es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="standard"
                fullWidth
                {...register("password", {
                  required: "El password es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
