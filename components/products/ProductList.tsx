import { Grid } from "@mui/material";
import { FC } from "react";
import { IProduct } from "../../interface";
import ProductCard from "./ProductCard";

interface Props {
  products: IProduct[];
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
