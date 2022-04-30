import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { dbProducts } from "../../database";
import { IProduct } from "../../interface/products";
import PageNotFound from "../404";

interface Props {
  products: IProduct[];
  foundProducts: boolean;

  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title="SHOP - search"
      pageDescription="compra los mejores productos"
    >
      <Typography variant="h1" component="h1" sx={{ my: 2 }}>
        Buscar productos
      </Typography>
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 2 }} textTransform='capitalize'>
          {query}
        </Typography>
      ) : (
       <Box display= 'flex'>
        <Typography variant="h2" sx={{ mb: 1 }}>
          No encontramos ningún producto
        </Typography>
        <Typography variant="h2" sx={{ ml: 1 }} color='secondary' textTransform='capitalize'>
          { query }
        </Typography>
       </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductByTerm(query);
  const foundProducts: boolean = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};
