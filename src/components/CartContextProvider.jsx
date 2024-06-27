import { useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../contexts/CartContext';

const CartContextProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

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
