import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";
import { CartContext } from "../../context/cart/CartContext";

interface Props {
  editable?: boolean;
}

const CardList: FC<Props> = ({ editable }) => {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart.map((product) => (
        <Grid container key={product.slug} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7} sx={{ sx: { mt: 1 }, sm:{ mt: 4 } }}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1"> {product.title}</Typography>
              <Typography variant="body1">
                Talle <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  onSetCounter={() => {}}
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{" "}
                  {product.quantity === 1 ? "Producto" : "Productos"}{" "}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{ sx: { mt: 1 }, sm:{ mt: 4 } }}
          >
            <Typography variant="subtitle1"> $ {product.price}</Typography>
            {editable && (
              <Button variant="text" color="secondary">
                Eliminar
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CardList;
