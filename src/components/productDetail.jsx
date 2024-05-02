import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddToCartBtn from './addToCard';

const ProductDetail = () => {
	const { id } = useParams();
	// Extract the correct product from the data.
	const [product, setProduct] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const url = 'https://fakestoreapi.com/products/' + id;
		fetch(url, { mode: 'cors' })
			.then((response) => {
				if (response.status >= 400) {
					throw new Error('Server Error');
				}
				return response.json();
			})
			.then((response) => setProduct(response))
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}, [id]);

	const handleAddToCart = (number) => {
		console.log('The form was submitted!', number, 'items added to cart');
		// add to the data object how many in the cart.
	};

	return (
		<>
			{(loading && <p> Loading the product...</p>) ||
				(error && (
					<section>
						<p>There was an error!</p>
						<p> {error.message}</p>
					</section>
				)) || (
					<section className="bg-white text-black font-bold p-2 rounded-2xl container h-full flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-4">
						<figure className="max-w-80 min-w-72">
							<img
								className="object-contain h-full w-full"
								src={product.image}
								alt="Product Image"
							/>
						</figure>
						<div className="flex flex-col gap-8 justify-between items-start">
							<h1 className="text-2xl">{product.title}</h1>
							<p>{product.price}€</p>
							<p>{product.description}</p>
							<AddToCartBtn handleFormSubmit={handleAddToCart} />
						</div>
					</section>
				)}
		</>
	);
};

ProductDetail.propTypes = {
	product: PropTypes.object,
};

export default ProductDetail;
