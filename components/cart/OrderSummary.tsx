import { Grid, Typography } from "@mui/material"


const OrderSummary = () => {
  return (
   <Grid container>

     <Grid item xs={6}>
      <Typography>Nro productos</Typography>
     </Grid>
     <Grid item   xs={6} display='flex' justifyContent='end' >
      <Typography>3</Typography>
     </Grid>
     <Grid item xs={6}>
      <Typography>subTotal</Typography>
     </Grid>
     <Grid item xs={6}  display='flex' justifyContent='end'>
      <Typography>$150</Typography>
     </Grid>

     <Grid item xs={6}>
      <Typography>Impuestos(15%)</Typography>
     </Grid>
     <Grid item xs={6}  display='flex' justifyContent='end'>
      <Typography>$250</Typography>
     </Grid>

     <Grid item xs={6} sx={{ mt: 2}}>
      <Typography variant='subtitle1'>Total</Typography>
     </Grid>

     <Grid item xs={6} sx={{ mt: 2 }}  display='flex' justifyContent='end'>
      <Typography variant='subtitle1'>$2250</Typography>
     </Grid>

   </Grid>
  )
}

export default OrderSummary