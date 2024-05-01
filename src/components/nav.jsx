import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiHome, mdiCartVariant, mdiShoppingOutline } from '@mdi/js';

const Nav = ({ cartItemCount = 0 }) => {
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
