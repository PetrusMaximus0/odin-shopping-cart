import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiHome, mdiCartVariant, mdiShoppingOutline } from '@mdi/js';

const Nav = ({ cartItemCount = 0 }) => {
	return (
		<nav className="text-lg">
			<ul className="flex gap-4">
				<li className="flex items-center gap-1">
					<Icon path={mdiHome} size={1} />
					<Link to="/">Home</Link>
				</li>
				<li className="flex items-center gap-1">
					<Icon path={mdiShoppingOutline} size={1} />
					<Link to="/products">Products</Link>
				</li>
				<li className="flex items-center gap-1">
					<Icon path={mdiCartVariant} size={1} />
					<Link to="/cart">
						Cart {cartItemCount > 0 ? `(${cartItemCount})` : ''}
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
