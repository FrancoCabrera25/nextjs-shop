// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getListSubheaderUtilityClass } from "@mui/material";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interface";
import { User } from "../../../models";
import { isValidObjectId } from 'mongoose';


type Data = {
  message: string;
} | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      /* Calling the function getUsers and passing in the req and res objects. */
      /* Calling the function getUsers and passing in the req and res objects. */
      return getUsers(req, res);

    case "PUT":
      return updateUser(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getUsers =  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
 
   await db.connect();
   const users = await User.find().select('-password').lean();
   await db.disconnect();

   return res.status(200).json(users);

};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
     
  const  { userId= '', role = ''} = req.body;

     if(!isValidObjectId(userId)){
      res.status(500).json({ message: "No existe usuario por ese id" });
     }

     const validRoles = ['admin', 'client'];

     if(!validRoles.includes(role)){
      res.status(500).json({ message: "Rol no permitdo" });
     }

     await db.connect();

     const user = await User.findById(userId);

     if(!user){
      res.status(500).json({ message: "No existe usuario por ese id" });
     }

     user!.role = role;
     await user!.save();
     await db.disconnect();

     res.status(200).json({ message: "Usuario actualizado" });

     
};
