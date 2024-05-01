import ProductCard from './productCard';
import { useState, useEffect } from 'react';

const ProductList = () => {
	// An array of product objects
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	// Get a number of items from the fakestore API
	useEffect(() => {
		fetch('https://fakestoreapi.com/products?limit=20', { mode: 'cors' })
			.then((response) => {
				if (response.status >= 400) {
					throw new Error('Server Error');
				}
				return response.json();
			})
			.then((response) => {
				// Store the information of these items.
				setProducts(response);
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<section>
			{(loading && (
				<p className="text-center text-4xl">Loading products</p>
			)) ||
				(error && (
					<div>
						<p>There was an error!</p>
						<p> {error.message}</p>
					</div>
				)) || (
					<ul className="main-animate grid gap-4 px-2 justify-around grid-cols-[repeat(auto-fit,340px)]">
						{
							// Based on the number of items that were retrieved, we render them on the page.
							products.map((item) => {
								return <ProductCard key={item.id} data={item} />;
							})
						}
					</ul>
				)}
		</section>
	);
};

export default ProductList;
