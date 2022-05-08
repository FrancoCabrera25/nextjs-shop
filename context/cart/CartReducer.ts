import { CartState } from "./";
import { ICartProduct } from "../../interface/cart";

type UiActionType =
  | { type: "[CART] - LOAD CART FROM COOKIES"; payload: ICartProduct[] }
  | { type: "[CART] - UPDATE CART"; payload: ICartProduct[] }
  | { type: "[CART] - CHANGE CART QUANTITY"; payload: ICartProduct };

export const cartReducer = (
  state: CartState,
  action: UiActionType
): CartState => {
  switch (action.type) {
    case "[CART] - LOAD CART FROM COOKIES":
      console.log("load cookies", action.payload);
      return {
        ...state,
        cart: action.payload,
      };
    case "[CART] - UPDATE CART":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "[CART] - CHANGE CART QUANTITY":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (
            product._id === action.payload._id &&
            product.size === action.payload._id
          ) {
            return action.payload;
          }

          return product;
        }),
      };
    default:
      return state;
  }
};
