import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { NextPage, GetServerSideProps } from 'next';
import React, { useContext, useState } from "react";
import { AuthLayout } from "../../components/layouts";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { shopApi } from "../../api";
import { ErrorOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import { getSession, signIn } from 'next-auth/react';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onRegisterForm = async ({ name, email, password }: FormInputs) => {
    setShowError(false);

    const {hasError, message} = await registerUser(name, email, password);

    if(hasError){
      console.log('message', message);
      setShowError(true);
      setErrorMessage(message);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }

    // const destination = router.query.p?.toString() || "/";
     // router.replace(destination);
     await signIn('credentials',{ email, password });
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
              <Chip sx={{ mt:2, display: showError ? 'flex' : 'none' }} label={errorMessage} color='error' icon={ <ErrorOutlined />} />
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
                label="Contrase??a"
                type="password"
                variant="standard"
                fullWidth
                {...register("password", {
                  required: "El password es requerido",
                  minLength: { value: 6, message: "M??nimo 6 caracteres" },
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
              <NextLink  href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : `/auth/login`
                } passHref>
                <Link underline="always">??Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  
  const session = await getSession({ req });

  const { p = '/' } = query;

  if( session ) {
    return {
      redirect: {
        destination:  p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
}




export default RegisterPage;
