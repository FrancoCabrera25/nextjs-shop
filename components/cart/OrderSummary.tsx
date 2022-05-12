import { Grid, Typography } from "@mui/material"
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { currency } from "../../utils";


const OrderSummary = () => {

 const { total, tax, numberOfItems, subTotal } = useContext(CartContext);
  
  return (
   <Grid container>

     <Grid item xs={6}>
      <Typography>productos</Typography>
     </Grid>
     <Grid item   xs={6} display='flex' justifyContent='end' >
      <Typography>{numberOfItems}</Typography>
     </Grid>
     <Grid item xs={6}>
      <Typography>subTotal</Typography>
     </Grid>
     <Grid item xs={6}  display='flex' justifyContent='end'>
      <Typography>{ subTotal && currency.format(subTotal)}</Typography>
     </Grid>

     <Grid item xs={6}>
      <Typography>Impuestos({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
     </Grid>
     <Grid item xs={6}  display='flex' justifyContent='end'>
      <Typography>{ tax  && currency.format(tax)}</Typography>
     </Grid>

     <Grid item xs={6} sx={{ mt: 2}}>
      <Typography variant='subtitle1'>Total</Typography>
     </Grid>

     <Grid item xs={6} sx={{ mt: 2 }}  display='flex' justifyContent='end'>
      <Typography variant='subtitle1'> { total && currency.format(total)}</Typography>
     </Grid>

   </Grid>
  )
}

export default OrderSummary