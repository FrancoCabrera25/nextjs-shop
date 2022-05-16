import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useState } from "react";
import { AuthLayout } from "../../components/layouts";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { shopApi } from "../../api";
import { ErrorOutlined } from "@mui/icons-material";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onRegisterForm = async ({ name, email, password }: FormInputs) => {
    setShowError(false);
    try {
      const { data } = await shopApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      console.log({ token, user });
    } catch (erorr) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout title="Registrarse">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
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
                Crear Cuenta
              </Typography>
              <Chip sx={{ mt:2, display: showError ? 'flex' : 'none' }} label='Ups Ocurrio un error' color='error' icon={ <ErrorOutlined />} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="standard"
                fullWidth
                {...register("name", {
                  required: "El Nombre es requerido",
                  minLength: {
                    value: 2,
                    message: "Debe ingresar 2 o mas caracteres",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                label="Contraseña"
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
                Registrarse
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
