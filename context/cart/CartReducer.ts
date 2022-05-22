import { CartState } from "./";
import { ICartProduct } from "../../interface/cart";
import { ShippingAddress } from "../../interface";


type UiActionType =
  | { type: "[CART] - LOAD CART FROM COOKIES"; payload: ICartProduct[] }
  | { type: "[CART] - UPDATE CART"; payload: ICartProduct[] }
  | { type: "[CART] - CHANGE CART QUANTITY"; payload: ICartProduct }
  | { type: "[CART] - REMOVE PRODUCT IN CART"; payload: ICartProduct }
  | {
      type: "[CART] - UPDATE SUMMARY";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | { type: "[CART] - LOAD SHIPPING ADDRESS"; payload: ShippingAddress }  
  | { type: "[CART] - UPDATE SHIPPING ADDRESS"; payload: ShippingAddress }  

export const cartReducer = (
  state: CartState,
  action: UiActionType
): CartState => {
  switch (action.type) {
    case "[CART] - LOAD CART FROM COOKIES":
      return {
        ...state,
        cart: action.payload,
        isLoaded: true,
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
    case '[CART] - UPDATE SUMMARY': 
    return{
      ...state,
      ...action.payload,
    }
    
    case '[CART] - UPDATE SHIPPING ADDRESS':
    case '[CART] - LOAD SHIPPING ADDRESS':
      return{
        ...state,
        shippingAddress: action.payload,
      }
    default:
      return state;
  }
};
