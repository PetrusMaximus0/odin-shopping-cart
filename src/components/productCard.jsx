import PropTypes from 'prop-types';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus } from '@mdi/js';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
	const handleAddToCart = (e) => {
		e.preventDefault();
		console.log('The form was submitted!');
		// add to the data object how many in the cart.
	};

	const incNumInCart = () => {
		setNumInCart(numInCart + 1);
	};

	const decNumInCart = () => {
		if (numInCart > 1) {
			setNumInCart(numInCart - 1);
		}
	};

	const [numInCart, setNumInCart] = useState(1);

	//
	return (
		<li className="product-card">
			<figure className="">
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
			<form
				className="flex justify-center gap-2"
				onSubmit={handleAddToCart}
				action=""
			>
				<div className="flex justify-center items-center gap-1">
					<button
						className="hover:bg-teal-500 active:bg-teal-950 active:text-white rounded-xl"
						onClick={decNumInCart}
						type="button"
					>
						<Icon path={mdiMinus} size={1} />
					</button>
					<input
						className="w-16 rounded-xl border border-teal-950 text-center"
						type="text"
						name="productNumber"
						id="productNumber"
						value={numInCart}
						disabled
					/>
					<button
						className="hover:bg-teal-500 active:bg-teal-950 active:text-white rounded-xl"
						onClick={incNumInCart}
						type="button"
					>
						<Icon path={mdiPlus} size={1} />
					</button>
				</div>
				<button className="hover:bg-teal-500 text-white bg-teal-950 active:bg-teal-950 rounded-xl px-4 py-1">
					Add to Cart
				</button>
			</form>
		</li>
	);
};

ProductCard.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ProductCard;
