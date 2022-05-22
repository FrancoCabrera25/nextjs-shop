import { FC, useReducer, PropsWithChildren, useEffect } from "react";
import { ICartProduct, IOrder, ShippingAddress } from "../../interface";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";
import { shopApi } from "../../api";

export interface CartState {
  cart: ICartProduct[];
  isLoaded: boolean;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

const UI_INITIAL_STATE: CartState = {
  cart: [],
  isLoaded: false,
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

type Props = {};
export const CartProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, UI_INITIAL_STATE);

  useEffect(() => {
    const cart = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];
    dispatch({ type: "[CART] - LOAD CART FROM COOKIES", payload: cart });
  }, []);

  // load shipping address
  useEffect(() => {
    const data: ShippingAddress = Cookie.get("address")
      ? JSON.parse(Cookie.get("address")!)
      : undefined;
    dispatch({ type: "[CART] - LOAD SHIPPING ADDRESS", payload: data });
  }, []);

  useEffect(() => {
    if (state.isLoaded) {
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

    dispatch({ type: "[CART] - UPDATE SUMMARY", payload: orderSummary });
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

  const updateShippingAddress = (shippingAddress: ShippingAddress) => {
    Cookie.set("address", JSON.stringify(shippingAddress));
    dispatch({
      type: "[CART] - UPDATE SHIPPING ADDRESS",
      payload: shippingAddress,
    });
  };

  const createOrder = async () => {
    try {
      if(!state.shippingAddress){
        throw new Error('No hay dirección de entrega');
      }

      const body: IOrder = {
        orderItem: state.cart,
        shippingAddres: state.shippingAddress,
        numberOfItems: state.numberOfItems,
        subTotal: state.subTotal,
        tax: state.tax,
        total: state.total,
        isPaid: false,
      }

      const {  data } = await shopApi.post('/orders', body);

      console.log('data', data);
    } catch (error) {}
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductTocart,
        upddateCartQuantity,
        removeCartProduct,
        updateShippingAddress,
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
