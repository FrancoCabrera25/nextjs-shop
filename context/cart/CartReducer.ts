import { CartState } from "./";
import { ICartProduct } from "../../interface/cart";

type UiActionType =
  | { type: "[CART] - LOAD CART FROM COOKIES"; payload: ICartProduct[] }
  | { type: "[CART] - UPDATE CART"; payload: ICartProduct[] }
  | { type: "[CART] - CHANGE CART QUANTITY"; payload: ICartProduct }
  | { type: "[CART] - REMOVE PRODUCT IN CART"; payload: ICartProduct };
export const cartReducer = (
  state: CartState,
  action: UiActionType
): CartState => {
  switch (action.type) {
    case "[CART] - LOAD CART FROM COOKIES":
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
    case "[CART] - REMOVE PRODUCT IN CART":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };
    default:
      return state;
  }
};
