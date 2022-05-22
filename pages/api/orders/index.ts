// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouteLoader } from "next/dist/client/route-loader";

type Data = {
  message: string;
};

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
function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = req.body;

  res.status(201).json(body);
}
