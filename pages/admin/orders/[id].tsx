import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditCardOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { CardList, OrderSummary } from "../../../components/cart";
import { GetServerSideProps } from "next";
import { dbOrders } from "../../../database";
import { IOrder } from "../../../interface";
import AdminLayout from "../../../components/layouts/AdminLayout";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddres } = order;

  return (
    <AdminLayout
      title={`Resumen de la orden`}
      subTitle={`OrdenId: ${order._id}`}
      icon={<AirplaneTicketOutlined />}
    >
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

      <Grid container className="fadeIn">
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

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Box sx={{ flex: 1 }} flexDirection="column" display='flex'>
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      label="Orden ya fue pagada"
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
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
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
