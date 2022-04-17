import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'

const Home: NextPage = () => {
  return (
   <ShopLayout title='SHOP' pageDescription='compra los mejores productos'>
      <Typography variant='h1' component='h1'>Home Tienda </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos </Typography>
   </ShopLayout>
  )
}

export default Home
