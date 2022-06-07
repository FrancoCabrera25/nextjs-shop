import { ConfirmationNumberOutlined, PeopleOutline } from "@mui/icons-material";
import { NextPage } from "next";
import { AdminLayout } from "../../../components/layouts";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Chip, Grid, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { IOrder, IUser } from "../../../interface";
import { useState, useEffect } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 250 },
  { field: "email", headerName: "Correo", width: 250 },
  { field: "name", headerName: "Nombre", width: 300 },
  { field: "total", headerName: "Total", width: 150 },
  {
    field: "isPaid",
    headerName: "Estado",
    width: 150,
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Pagada" color="success" />
      ) : (
        <Chip variant="outlined" label="Pendiente" color="error" />
      );
    },
  },
  {
    field: "nroProducts",
    headerName: "No. Productos",
    align: "center",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Fecha",
    width: 200,
  },
  {
    field: "check",
    headerName: "Ver mas",
    align: "center",
    width: 200,
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank">
          Ver orden
        </a>
      );
    },
  },
];

const OrdersPages: NextPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user! as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    nroProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title={"Ordenes"}
      subTitle={"Mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn" display="flex" justifyContent="center">
        <Grid
          item
          xs={12}
          sx={{
            height: 650,
            width: "100%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPages;
