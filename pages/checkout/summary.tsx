import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
  Chip,
} from "@mui/material";
import { NextPage } from "next";
import NextLink from "next/link";
import { CardList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { countries } from "../../utils";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage: NextPage = () => {
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);
  const [errorMesssage, setErrorMessage] = useState('');
  useEffect(() => {
    if (!Cookies.get("address")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);
   const { hasError, message } = await createOrder();

      if(hasError){
        setIsPosting(false);
        setErrorMessage(message);
        return;
      }

      router.replace(`/orders/${message}`)

  };

  if (!shippingAddress) {
    return <></>;
  }

  const {
    firstName,
    lastName,
    address,
    address2 = "",
    city,
    country,
    phone,
    zipCode,
  } = shippingAddress;

  return (
    <ShopLayout title="Resumen de compra" pageDescription="resumen de la orden">
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}
                {numberOfItems === 1 ? "producto" : "productos"} )
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}{" "}
              </Typography>
              <Typography>
                {address} {address2 ? `, ${address2}` : ""}
              </Typography>
              <Typography>
                {city}, {zipCode}{" "}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === country)?.name}{" "}
              </Typography>
              <Typography>{phone} </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Finalizar Compra
                </Button>
                <Chip
                  color="error"
                  label={errorMesssage}
                   sx={{ display: errorMesssage ? "flex" : "none", mt: 2}}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
