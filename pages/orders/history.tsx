import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interface/order";
import { currency } from "../../utils";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },

  {
    field: "fullname",
    headerName: "Nombre Completo",
    width: 300,
  },
  {
    field: "numberOfItems",
    headerName: "Productos",
    width: 150,
  },
  {
    field: "total",
    headerName: "Total",
    width: 250,
    renderCell: (params: GridValueGetterParams) => {
      return currency.format(params.row.total);
    },
  },
  {
    field: "paid",
    headerName: "Estado",
    description: "Estado para saber si la orden esta pagada",
    width: 250,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="Pendiente" variant="outlined" />
      );
    },
  },
  {
    field: "detalle",
    headerName: "Detalle",
    width: 250,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">Ver Detalle</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

//TODO: REFACTORIZAR Y PASAR A COMPONENTES ESTE PAGINA

const HistoryPage: NextPage<Props> = ({ orders }) => {
  console.log('order', orders);
  const rows = orders.map((order, index) => ({
    id: index,
    fullname: `${order.shippingAddres.firstName} ${order.shippingAddres.lastName}`,
    paid: order.isPaid,
    orderId: order._id,
    total: order.total,
    numberOfItems: order.numberOfItems,
  }));

  return (
    <ShopLayout
      title="Historial de Ordenes"
      pageDescription="historial ordenes"
    >
      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
        Historial de ordenes
      </Typography>

      <Grid container className="fadeIn" display="flex" justifyContent="center">
        <Grid
          item
          xs={12}
          sx={{
            height: 650,
            width: "100%",
            display: { xs: "none", md: "flex" },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
        <Grid item xs={12} sx={{  display: { xs: "flex", md: "none" }, }}>
          <Grid container spacing={2}>
            {rows.map((row) => (
              <Grid item key={row.orderId} xs={12}  sm={6}>
                <Card>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      margin: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      {`Order: ${row.orderId}`}
                    </Typography>

                    {row.paid ? (
                      <Chip
                        color="success"
                        label="Pagada"
                        variant="outlined"
                        sx={{ m: 1 }}
                      />
                    ) : (
                      <Chip
                        color="error"
                        label="Pendiente"
                        variant="outlined"
                        sx={{ m: 1 }}
                      />
                    )}
                  </Box>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body1" sx={{ p: 1 }}>
                      Nombre: {row.fullname}
                    </Typography>
                    <Typography variant="body1" sx={{ p: 1 }}>
                      Productos: {row.numberOfItems}
                    </Typography>
                    <Typography variant="body1" sx={{ p: 1 }}>
                      Total: {currency.format(row.total)}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}
                  >
                    <NextLink href={`/orders/${row.orderId}`} passHref>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="circular-btn"
                        size="large"
                      >
                        Ver Detalle
                      </Button>
                    </NextLink>
                  </CardActions>
                </Card>
              </Grid>
              // <Card
              //   key={row.orderId}
              //   sx={{
              //     display: { xs: "flex", md: "none" },
              //     flexDirection: "column",
              //     margin: 1,
              //     width: { xs: "100%", sm: "45%" },
              //   }}
              // >
              //   <Box
              //     sx={{
              //       display: "flex",
              //       flexDirection: "row",
              //       margin: 1,
              //       justifyContent: "space-between",
              //       alignItems: "center",
              //     }}
              //   >
              //     <Typography variant="subtitle2">
              //       {`Order: ${row.orderId}`}
              //     </Typography>

              //     {row.paid ? (
              //       <Chip
              //         color="success"
              //         label="Pagada"
              //         variant="outlined"
              //         sx={{ m: 1 }}
              //       />
              //     ) : (
              //       <Chip
              //         color="error"
              //         label="Pendiente"
              //         variant="outlined"
              //         sx={{ m: 1 }}
              //       />
              //     )}
              //   </Box>

              //   <CardContent sx={{ p: 2 }}>
              //     <Typography variant="body1" sx={{ p: 1 }}>
              //       Nombre: {row.fullname}
              //     </Typography>
              //     <Typography variant="body1" sx={{ p: 1 }}>
              //       Productos: {row.numberOfItems}
              //     </Typography>
              //     <Typography variant="body1" sx={{ p: 1 }}>
              //       Total: {currency.format(row.total)}
              //     </Typography>
              //   </CardContent>
              //   <CardActions
              //     sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}
              //   >
              //     <NextLink href={`/orders/${row.orderId}`} passHref>
              //       <Button
              //         variant="contained"
              //         color="secondary"
              //         className="circular-btn"
              //         size="large"
              //       >
              //         Ver Detalle
              //       </Button>
              //     </NextLink>
              //   </CardActions>
              // </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
