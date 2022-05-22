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
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interface";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddres } = order;
  return (
    <ShopLayout
      title={`Resumen de la orden ${order._id}`}
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1">
        Orden: {order._id}
      </Typography>
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Pagada"
          variant="outlined"
          color="success"
          icon={<CreditCardOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardList products={order.orderItems} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems}{" "}
                {order.numberOfItems > 1 ? "productos" : "producto"})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
              </Box>

              <Typography>
                {shippingAddres.firstName} {shippingAddres.lastName}{" "}
              </Typography>
              <Typography>
                {" "}
                {shippingAddres.address}{" "}
                {shippingAddres.address2 ? shippingAddres.address2 : ""}
              </Typography>
              <Typography>{shippingAddres.city}</Typography>
              <Typography>{shippingAddres.zipCode}</Typography>
              <Typography>{shippingAddres.country}</Typography>
              <Typography>{shippingAddres.phone}</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary
                orderValues={{
                  total: order.total,
                  tax: order.tax,
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                }}
              />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                {
                  order.isPaid ? (<Chip
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditCardOutlined />}
                  />):(
                    <Button color="secondary" className="circular-btn" fullWidth>
                    Pagar
                  </Button>
                  )
                }
          
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?=p/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
