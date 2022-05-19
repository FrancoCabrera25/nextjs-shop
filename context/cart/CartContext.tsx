import { createContext } from "react";
import { ICartProduct } from "../../interface";
import { ShippingAddress } from "./CartProvider";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;

  shippingAddress?: ShippingAddress;

  addProductTocart: (product: ICartProduct) => void;
  upddateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateShippingAddress: (shippingAddress: ShippingAddress) => void
}

export const CartContext = createContext({} as ContextProps);
