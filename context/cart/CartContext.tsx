import { createContext } from 'react';
import { ICartProduct } from '../../interface';


interface ContextProps {
    cart: ICartProduct[];

    addProductTocart: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as ContextProps);