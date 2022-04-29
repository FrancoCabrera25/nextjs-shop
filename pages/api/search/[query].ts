// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "../../../database";
import { IProduct } from "../../../interface";
import { Product } from "../../../models";

type Data = { message: string } | IProduct[];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const searchProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { query = "" } = req.query;

  if (query.length === 0) {
    return res
      .status(400)
      .json({ message: "Debe especificar el query de búsqueda" });
  }

  query = query.toString().toLowerCase();

  await db.connect();

  const product = await Product.find({ $text: { $search: query } })
  .select("title images price inStock slug -_id")
  .lean();
  await db.disconnect();

  if (product) {
    return res.status(200).json(product);
  }

  return res.status(400).json({ message: "Producto no encontrado" });
};
