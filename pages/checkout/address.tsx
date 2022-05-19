import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";
import { useContext } from 'react';
import { CartContext } from "../../context";

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = () => {
  const data: FormInputs = Cookies.get("address")
    ? JSON.parse(Cookies.get("address")!)
    : null;

  if (data) {
    return data;
  }

  return null;
};

const AddressPage: NextPage = () => {
  const currentAddress = getAddressFromCookies();
  const router = useRouter();
  const { updateShippingAddress } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: currentAddress
      ? currentAddress
      : {
          firstName: "",
          lastName: "",
          address: "",
          address2: "",
          zipCode: "",
          city: "",
          country: "",
          phone: "",
        },
  });

  const onAddress = (data: FormInputs) => {
    updateShippingAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout
      title="Dirección"
      pageDescription="Confirmar dirección del destino"
    >
      <Typography variant="h1" component="h1">
        Dirección
      </Typography>
      <form onSubmit={handleSubmit(onAddress)} noValidate>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "El nombre es requerido",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "El apellido es requerido",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              {...register("address", {
                required: "La dirección es requerida",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2(Opcional)"
              variant="filled"
              fullWidth
              {...register("address2")}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Código Postal"
              variant="filled"
              fullWidth
              {...register("zipCode", {
                required: "El código postal es requerido",
              })}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "La ciudad es requerida",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="País"
                defaultValue = { countries[0].code }
                {...register("country", {
                  required: "Debe seleccionar un país",
                })}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {/* <MenuItem value=""> Seleccione un país</MenuItem> */}
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "El teléfono es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            color="secondary"
            className="cirular-btn"
            size="large"
            type="submit"
          >
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//   const { token = ''} = req.cookies;

//   let isValidToken = false;

//   try {
//       await jwt.isValidToken(token);
//      isValidToken = true;
//   } catch (error) {
//     isValidToken= false;
//   }

//    if(!isValidToken) {
//       return {
//         redirect:{
//           destination: '/auth/login?p=/checkout/address',
//           permanent: false
//         }
//       }
//    }

//   return {
//     props: {

//     }
//   }
// }

export default AddressPage;
