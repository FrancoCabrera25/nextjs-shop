import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const MenPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products?gender=men");

  return (
    <ShopLayout title="SHOP - Men" pageDescription="Encuentra los mejores productos para hombres">
      <Typography variant="h1" component="h1">
       Hombres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
       Productos para hombres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;