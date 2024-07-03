import { createContext } from 'react';
import { ICartContext } from '../interfaces';

const CartContext = createContext<ICartContext>(null as unknown as ICartContext);

export default CartContext;
