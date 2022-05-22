import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "../../interface";


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
  updateShippingAddress: (shippingAddress: ShippingAddress) => void;
   createOrder: () => Promise<void>;
}

export const CartContext = createContext({} as ContextProps);
