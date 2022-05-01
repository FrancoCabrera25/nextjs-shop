import { CartState } from './';
import { ICartProduct } from '../../interface/cart';


type UiActionType = 
| {type: '[CART] - LOAD CART FROM COOKIES', payload: ICartProduct[] }
| { type: '[CART] - UPDATE CART', payload: ICartProduct[] }

export const cartReducer = (state: CartState, action: UiActionType): CartState => {

    switch (action.type) {
        case '[CART] - LOAD CART FROM COOKIES':
           return {
               ...state,
           }
        case '[CART] - UPDATE CART': 
        return {
            ...state,
            cart: [ ...action.payload ]
        }
        default:
            return state;
    }
}