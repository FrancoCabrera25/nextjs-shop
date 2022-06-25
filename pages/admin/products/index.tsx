import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { NextPage } from "next";
import { AdminLayout } from "../../../components/layouts";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Link,
  MenuItem,
  Select,
} from "@mui/material";
import useSWR from "swr";
import { IProduct } from "../../../interface";
import { format } from "../../../utils/currency";
import NextLink from "next/link";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank">
          <CardMedia
            alt={row.title}
            component="img"
            className="fadeIn"
            image={ row.img }
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    width: 500,
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Genero" },
  { field: "type", headerName: "Tipo" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Talle" },
  //   {
  //     field: "check",
  //     headerName: "Ver mas",
  //     align: "center",
  //     width: 200,
  //     renderCell: ({ row }: GridValueGetterParams) => {
  //       return (
  //         <a href={`/admin/orders/${row.id}`} target="_blank">
  //           Ver orden
  //         </a>
  //       );
  //     },
  //   },
];

const ProductsPage: NextPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");
  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    price: format(product.price),
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Productos ${data?.length}`}
      subTitle={"Mantenimiento de productos"}
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
          className='circular-btn'
        >
          Crear producto
        </Button>
      </Box>
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

export default ProductsPage;
