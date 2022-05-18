import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { CardList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { useRouter } from "next/router";


const CartPage: NextPage = () => {
  const { isLoaded, cart } = useContext(CartContext);

  const router = useRouter();
  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [ isLoaded, cart, router ]);

  if(!isLoaded || cart.length == 0){
    return (<></>);
  }

  return (
    <ShopLayout title="Carrito - 3" pageDescription="">
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={12} sm={7}>
          <CardList editable />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
