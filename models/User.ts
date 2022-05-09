import mongoose, { Schema, model, Model } from "mongoose";
import { IUser } from "../interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "client"],
        message: "{VALUE} no es nun role valido",
        default: "client",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User:Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;