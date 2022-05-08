import { FC, useReducer, PropsWithChildren, useEffect } from "react";
import { ICartProduct } from "../../interface";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
}

 const CheckProductsInCookieCart = (): ICartProduct[] => {
  let cookieProducts: ICartProduct[] = [];
  try {
    cookieProducts = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];
    return cookieProducts;
  } catch (error) {
    return cookieProducts;
  }
};

const UI_INITIAL_STATE: CartState = {
  cart: CheckProductsInCookieCart(),
};

type Props = {};
export const CartProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, UI_INITIAL_STATE);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

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

  const upddateCartQuantity = (product: ICartProduct): void => {
      dispatch({type: '[CART] - CHANGE CART QUANTITY', payload: product});
  }

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductTocart,
        upddateCartQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
