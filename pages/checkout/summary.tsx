import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import NextLink from "next/link";
import { CardList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { countries } from "../../utils";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage: NextPage = () => {

   const { shippingAddress, numberOfItems } = useContext(CartContext);
   const router = useRouter();
    useEffect(() => {
     if(!Cookies.get('address')){
      router.push('/checkout/address');
     }    
    }, [ router ])
    
   if(!shippingAddress){
     return (<></>)
   }

   const {firstName, lastName, address, address2 = '', city, country, phone, zipCode}  = shippingAddress;

  return (
    <ShopLayout title="Resumen de compra" pageDescription="resumen de la orden">
      <Typography variant="h1" component="h1" sx= { { mb: 2 } }>
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen ({numberOfItems }{ numberOfItems === 1 ? 'producto' : 'productos' } )</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent='space-between'>
              <Typography variant="subtitle1">Dirección de entrega</Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>{ firstName } { lastName } </Typography>
              <Typography>{ address } { address2 ? `, ${address2}` : '' }</Typography>
              <Typography>{ city }, { zipCode } </Typography>
              <Typography>{ countries.find(c => c.code  === country)?.name } </Typography>
              <Typography>{ phone } </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>


              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Finalizar Compra
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
