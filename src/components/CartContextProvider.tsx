import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../contexts/CartContext';
import { ICartItem } from '../interfaces';

const CartContextProvider = ({ children } : {children: React.ReactNode}) => {
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);

	return (
		<CartContext.Provider value={{ cartItems, setCartItems }}>
			{children}
		</CartContext.Provider>
	);
};

CartContextProvider.propTypes = {
	children: PropTypes.element,
};

export default CartContextProvider;
