import jwt from "jsonwebtoken";

export const singToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_CLAVE) {
    throw new Error("No encontro clave jwt en las configuraciones");
  }

 return jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_CLAVE,
    { expiresIn: "1d" }
  );
};
