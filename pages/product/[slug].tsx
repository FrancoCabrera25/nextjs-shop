import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { SizeSelector } from "../../components/products";
import { ItemCounter, SlidesShow } from "../../components/ui";
import { initialData } from "../../database/products";
import { IProduct } from "../../interface";
import { GetStaticProps, GetStaticPaths } from "next";
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { dbProducts } from "../../database";
import { useState } from "react";
import { ICartProduct } from "../../interface/cart";
import { ISizes } from "../../interface/products";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<ISizes>();
  const [currentQuantity, setCurrentQuantity] = useState(1);


  const addCart = () =>{
    console.log('currentQuantity', currentQuantity);
    console.log('selectedSize', selectedSize);
  }
  // const [tempCartProduct, setTemCartProduct] = useState<ICartProduct>({
  //   _id: product._id,
  //   image: product.images[0],
  //   price: product.price,
  //   size: '',
  //   slug: product.slug,
  //   title: product.title,
  //   gender: product.gender,
  //   quantity: 1
  // })

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <SlidesShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              $ {product.price}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter 
              currentValue={currentQuantity}
              maxValue={product.inStock}
              onSetCounter={setCurrentQuantity} />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectedSize={ setSelectedSize }
              />
            </Box>
            {product.inStock > 0 ? (
              <Button onClick={addCart} color="secondary" className="circular-btn">
                {selectedSize ? "Agregar al carrito" : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };

//   const product = await dbProducts.getProductBySlug(slug);

//   if(!product){
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productsSlugs = await dbProducts.getAllProdutSlugs();

  return {
    paths: productsSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
