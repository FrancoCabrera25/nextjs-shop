// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils";
import { RestartAlt } from "@mui/icons-material";

type Data = {
  message: string;
} |{
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return checkJWT(req, res);
      break;

    default:
      res.status(400).json({ message: "Bad request" });
  }
}
const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies;


  let userId: string = '';

  try{
      userId = await jwt.isValidToken(token);

  }catch(error){
        return res.status(401).json({ message: 'Token no es valido'})
  }

 await db.connect();
 const user = await User.findById({ _id: userId }).lean();
 await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: "No existe usuario con ese id" });
  }


  const { role, name, _id, email } = user;

  const newToken = jwt.singToken(_id, email);

  return res.status(200).json({
    token: newToken,
    user: {
      email,
      name,
      role,
    },
  });
};
