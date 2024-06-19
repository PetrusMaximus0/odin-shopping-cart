import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import AddToCartBtn from './addToCartBtn';

const ProductDetail = () => {
	const { id } = useParams();

	// Extract the correct product from the data.
	const [product, setProduct] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	// Access the context
	const [cartItems, setCartItems] = useOutletContext();

	//
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
		// Check if this product is in the cart
		const newProducts = [...cartItems];
		const index = newProducts.findIndex((element) => {
			return element.id === parseInt(id);
		});
		if (index !== -1) {
			// The product is in the cart, add quantity.
			newProducts[index].quantity += number;
			setCartItems(newProducts);
		} else {
			// The product isn't in the cart, add it to the cart.
			setCartItems([...newProducts, { ...product, quantity: number }]);
		}
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
							<p className="text-3xl">{product.price}€</p>
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