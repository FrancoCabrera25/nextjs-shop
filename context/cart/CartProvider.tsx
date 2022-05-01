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

  const addProductTocart = (product: ICartProduct) => {
    const productInCart = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (productInCart) {
      const updatedProducts = state.cart.map((p) => {
        if (p._id === product._id && p.size === product.size) {
          p.quantity += product.quantity;
          return p;
        }

        return p;
      });

      return dispatch({
        type: "[CART] - UPDATE CART",
        payload: updatedProducts,
      });
    }

    return dispatch({
      type: "[CART] - UPDATE CART",
      payload: [...state.cart, product],
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductTocart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
