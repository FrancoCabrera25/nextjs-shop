// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interface";
import { Product } from "../../../models";
import { isValidObjectId } from "mongoose";

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return updateProduct(req, res);
    case "POST":
      return createProduct(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: "asc" }).lean();
  await db.disconnect();

  res.status(200).json(products);
};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El id del producto no es valido" });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos 2 imágenes" });
  }

  try {
    await db.connect();
    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "No existe un producto con ese id" });
    }

    await product.update(req.body);
    await db.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: "Error interno" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos 2 imágenes" });
  }

  try {
    await db.connect();
    const productInDB = await Product.findOne({ slug: req.body.slug });

    if (productInDB) {
      return res
        .status(400)
        .json({
          message: `ya existe un producto con el mismo slug: ${req.body.slug}`,
        });
    }

    const product = new Product(req.body);
    product.save();
    await db.disconnect();

    return res.status(201).json(product);
    
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal error al crear un producto" });
  }
};
