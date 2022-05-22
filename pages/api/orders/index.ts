// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { IOrder } from '../../../interface/order';
import { db } from '../../../database';
import { Order, Product } from "../../../models";

type Data = 
| {  message: string } 
| IOrder;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}
  const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  const session: any = await getSession({  req });

    if(!session){
      return res.status(401).json({ message: "No autenticado" });
    }

    //crear arreglo con los productos
    const productsId = orderItems.map(product => product._id );

    db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsId } });

    try {
       const subTotal = orderItems.reduce((prev, current) =>{
         const currentPrice = dbProducts.find( prod => prod.id === current._id)?.price;

         if(!currentPrice){
           throw new Error('el producto no existe');
         }
         return (currentPrice * current.quantity) + prev;

       } , 0);

       const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
       const backendTotal = subTotal * (taxRate + 1);

       if(total !== backendTotal){
          throw new Error('El total no coincide')
       }

       const userId = session.user._id;
       const newOrder = new Order({...req.body, isPaid: false, user: userId});
       await newOrder.save();
       await db.disconnect();
       
       return res.status(201).json(newOrder); 

      } catch (error: any) {
          await db.disconnect();
          res.status(400).json( { message: error.message});
    }

}
