import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiHome, mdiCartVariant, mdiShoppingOutline } from '@mdi/js';
import {useContext, useMemo} from 'react';
import CartContext from '../contexts/CartContext';
import { ICartItem } from '../interfaces';

const Nav = () => {
	const { cartItems } = useContext(CartContext);
	const cartItemCount = useMemo(()=> cartItems.reduce((accumulator: number, currentValue: ICartItem) => {
		return accumulator + currentValue.quantity;
	}, 0),[ cartItems ]); 
	
	return (
		<nav>
			<ul className="flex gap-1.5 text-2xl text-complementary">
				<li className="w-fit h-fit bg-primary rounded-lg px-2 py-1.5">
					<Link
						className="flex items-center gap-1.5 hover:text-accent"
						to="/"
					>
						<Icon path={mdiHome} size={1} />
						Home
					</Link>
				</li>
				<li className="w-fit h-fit bg-primary rounded-lg px-2 py-1.5"> 
					<Link
						className="flex items-center gap-1 hover:text-accent"
						to="/products"
					>
						<Icon path={mdiShoppingOutline} size={1} />
						Products
					</Link>
				</li>
				<li className="w-fit h-fit bg-primary rounded-lg px-2 py-1.5">
					<Link
						className="flex items-center gap-1 hover:text-accent"
						to="/cart"
					>
						<Icon path={mdiCartVariant} size={1} />
						<span>
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
