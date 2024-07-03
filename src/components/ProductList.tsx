import ProductCard from './ProductCard';
import useFetchProducts from '../hooks/useFetchProducts';

const ProductList = () => {
	// Get a number of items from the fakestore API
	const { products, loading, error } = useFetchProducts();

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
							products!.map((item) => {
								return <ProductCard key={item.id} data={item} />;
							})
						}
					</ul>
				)}
		</section>
	);
};

export default ProductList;
