import { FC, useReducer, PropsWithChildren, useEffect } from "react";
import { ICartProduct } from "../../interface";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
  initialized: boolean;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

//  const CheckProductsInCookieCart = (): ICartProduct[] => {
//   let cookieProducts: ICartProduct[] = [];
//   try {
//     cookieProducts = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];
//     return cookieProducts;
//   } catch (error) {
//     return cookieProducts;
//   }
// };

const UI_INITIAL_STATE: CartState = {
  cart: [],
  initialized: false,
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

type Props = {};
export const CartProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, UI_INITIAL_STATE);

  useEffect(() => {
    const cart = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];
    dispatch({ type: "[CART] - LOAD CART FROM COOKIES", payload: cart });
  }, []);

  useEffect(() => {
    if (state.initialized) {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxeRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxeRate,
      total: subTotal * (taxeRate + 1),
    };

      dispatch({ type: '[CART] - UPDATE SUMMARY', payload: orderSummary });

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
    dispatch({ type: "[CART] - CHANGE CART QUANTITY", payload: product });
  };

  const removeCartProduct = (product: ICartProduct): void => {
    dispatch({ type: "[CART] - REMOVE PRODUCT IN CART", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductTocart,
        upddateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
