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

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_CLAVE) {
    throw new Error("No encontro clave jwt en las configuraciones");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_CLAVE || "", (err, payload) => {
        if (err) return reject("JWT no es valido");

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      reject("JWT no es valido");
    }
  });
};
