// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IPaypal } from "../../../interface";
import { Order } from "../../../models";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}
const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { transactionId = "", orderId = "" } = req.body;
  const paypalBeabrerToken = await getPaypalBearerToken();

  if (!paypalBeabrerToken) {
    res.status(500).json({ message: `no se pudo obtener el token de paypal` });
  }
  const url = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${ paypalBeabrerToken }`,
    },
  });

  if (data.status !== "COMPLETED") {
    return res.status(500).json({ message: "Orden no reconocida" });
  }

  await db.connect();
  const order = await Order.findById(orderId);

  if (!order) {
    db.disconnect();
    return res
      .status(500)
      .json({ message: `Orden no existe con el ID: ${orderId}` });
  }

  if (order.total !== Number(data.purchase_units[0].amount.value)) {
    db.disconnect();
    return res
      .status(500)
      .json({ message: "los montos de paypal y la orden no coinciden" });
  }

  order.transactionId = transactionId;
  order.isPaid = true;
  order.save();

  await db.disconnect();

  res.status(200).json({ message: `Orden Pagada` });
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");
  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return null;
  }
};
