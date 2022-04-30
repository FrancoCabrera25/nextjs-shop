import { FC, useReducer, PropsWithChildren } from "react";
import { ICartProduct } from "../../interface";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const UI_INITIAL_STATE: CartState = {
  cart: [],
};

type Props = {};
export const CartProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, UI_INITIAL_STATE);

  return (
    <CartContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
