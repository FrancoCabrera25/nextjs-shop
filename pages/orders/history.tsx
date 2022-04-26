import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

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
      field: 'paid',
      headerName: 'Estado',
      description: 'Estado para saber si la orden esta pagada',
      width: 200,
      renderCell: (params: GridValueGetterParams) => {
          return params.row.paid ? 
          <Chip color='success' label= 'Pagada'  variant='outlined' /> :
          <Chip color='error' label= 'Pendiente'  variant='outlined' />
      }
  },
  {
    field: 'detalle',
    headerName: 'Detalle',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
        return (
            <NextLink href={ `/orders/${params.row.id}`} passHref>
             <Link underline='always'>
              Ver Detalle
             </Link>       
            </NextLink>
        )
    }
}
];

const rows = [
    {
        id: '1',
        paid: true,
        fullname: 'franco cabrera',
    },
    {
        id: '166',
        paid: false,
        fullname: 'franco cabrera',
    },
    {
        id: '31',
        paid: true,
        fullname: 'franco cabrera',
    }, {
        id: '12',
        paid: true,
        fullname: 'franco cabrera',
    }, {
        id: '3',
        paid: false,
        fullname: 'franco cabrera',
    }, {
        id: '12',
        paid: true,
        fullname: 'franco cabrera',
    }, {
        id: '5',
        paid: true,
        fullname: 'franco cabrera',
    }

]

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de Ordenes"
      pageDescription="historial ordenes"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
