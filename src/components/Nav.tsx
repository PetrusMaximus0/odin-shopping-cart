import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiHome, mdiCartVariant, mdiShoppingOutline } from '@mdi/js';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../contexts/CartContext';
import { ICartItem } from '../interfaces';

const Nav = () => {
	const [cartItemCount, setCartItemCount] = useState(0);

	const { cartItems } = useContext(CartContext);
	
	useEffect(() => {
		const result = cartItems.reduce((accumulator: number, currentValue: ICartItem) => {
			return accumulator + currentValue.quantity;
		}, 0);
		setCartItemCount(result);
	}, [cartItems]);

	return (
		<nav className="text-lg">
			<ul className="flex gap-4">
				<li>
					<Link
						className="flex items-center gap-1 hover:text-orange-300"
						to="/"
					>
						<Icon path={mdiHome} size={1} />
						Home
					</Link>
				</li>
				<li>
					<Link
						className="flex items-center gap-1 hover:text-orange-300"
						to="/products"
					>
						<Icon path={mdiShoppingOutline} size={1} />
						Products
					</Link>
				</li>
				<li>
					<Link
						className="flex items-center gap-1 hover:text-orange-300"
						to="/cart"
					>
						<Icon path={mdiCartVariant} size={1} />
						<span>
							{' '}
							Cart {cartItemCount > 0 ? `(${cartItemCount})` : ''}
						</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

Nav.propTypes = {
	cartItemCount: PropTypes.number,
};

export default Nav;
