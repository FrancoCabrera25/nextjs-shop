import { SignalCellularNullRounded } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material"
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { currency } from "../../utils";


interface Props {
  orderValues?: {
    total: number;
     tax: number; 
     numberOfItems: number; 
     subTotal: number;
  }
}

const OrderSummary:FC<Props> = ({ orderValues  }) => {

 const { total, tax, numberOfItems, subTotal } = useContext(CartContext);

 const summaryValues = orderValues ? orderValues : { total, tax, numberOfItems, subTotal };
  
  return (
   <Grid container>

     <Grid item xs={6}>
      <Typography>productos</Typography>
     </Grid>
     <Grid item   xs={6} display='flex' justifyContent='end' >
      <Typography>{summaryValues.numberOfItems}</Typography>
     </Grid>
     <Grid item xs={6}>
      <Typography>subTotal</Typography>
     </Grid>
     <Grid item xs={6}  display='flex' justifyContent='end'>
      <Typography>{ summaryValues  && currency.format(summaryValues.subTotal)}</Typography>
     </Grid>

     <Grid item xs={6}>
      <Typography>Impuestos({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
     </Grid>
     <Grid item xs={6}  display='flex' justifyContent='end'>
      <Typography>{ summaryValues && summaryValues.tax && currency.format(summaryValues.tax)}</Typography>
     </Grid>

     <Grid item xs={6} sx={{ mt: 2}}>
      <Typography variant='subtitle1'>Total</Typography>
     </Grid>

     <Grid item xs={6} sx={{ mt: 2 }}  display='flex' justifyContent='end'>
      <Typography variant='subtitle1'> { summaryValues && summaryValues.total && currency.format(summaryValues.total)}</Typography>
     </Grid>

   </Grid>
  )
}

export default OrderSummary