import { CreditCardOffOutlined, CreditCardOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import NextLink from "next/link";
import { CardList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";

const OrderPage: NextPage = () => {
  return (
    <ShopLayout
      title="Resumen de la orden 1123123123"
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1">
        Orden: 123123123123
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Pagada"
        variant="outlined"
        color='success'
        icon={<CreditCardOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>Franco Cabrera</Typography>
              <Typography>Dirección</Typography>
              <Typography>Dirección</Typography>
              <Typography>Dirección</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Pagar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
