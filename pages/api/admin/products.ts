// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interface';
import { Product } from '../../../models';

type Data = {
  message: string
} | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res);
            case 'PUT':
            return updateProduct(req, res);
            case 'POST':
            return createProduct(req, res);
            
        default:
            res.status(400).json({ message: 'Bad request' });
    }
  
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
   await db.connect();
    const products = await Product.find().sort({ title: 'asc'}).lean();
   await db.disconnect();

   res.status(200).json(products);
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    throw new Error('Function not implemented.');
}

const createProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    throw new Error('Function not implemented.');
}
