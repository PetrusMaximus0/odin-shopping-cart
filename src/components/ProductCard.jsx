import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddToCartBtn from './AddToCartBtn';
import { useOutletContext } from 'react-router-dom';

const ProductCard = ({ data }) => {
	// Access context for adding products to the cart.
	const [cartItems, setCartItems] = useOutletContext();

	//
	const handleAddToCart = (number) => {
		// Check if ID is IN the cartItems
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((item) => data.id === item.id);
		if (index !== -1) {
			//The product is in the cart, add quantity.
			newCartItems[index].quantity += number;
			//
			setCartItems(newCartItems);
		} else {
			setCartItems([...cartItems, { ...data, quantity: number }]);
		}
	};

	return (
		<li className="grid gap-4 p-8 bg-white border border-black rounded-2xl text-slate-800 content-between justify-center grid-rows-[150px_repeat(3,auto)]">
			<figure>
				<img
					className="object-contain h-full w-full"
					src={data.image}
					alt="PRODUCT IMAGE"
				/>
			</figure>
			<h1 className="max-w-full text-lg whitespace-nowrap overflow-hidden text-ellipsis">
				<Link to={`/products/${data.id}`}> Product {data.title} </Link>
			</h1>
			<p className="text-xl font-bold"> {data.price} €</p>
			<AddToCartBtn handleFormSubmit={handleAddToCart} />
		</li>
	);
};

ProductCard.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ProductCard;
