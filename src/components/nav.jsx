import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ cartItemCount }) => {
	return (
		<nav className="text-lg">
			<ul className="flex gap-4">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/products">Products</Link>
				</li>
				<li>
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

Nav.defaultProps = {
	cartItemCount: 0,
};

export default Nav;
