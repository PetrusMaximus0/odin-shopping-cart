import { useParams } from 'react-router-dom';
import AddToCartBtn from './AddToCartBtn';
import useFetchProductDetail from '../hooks/useFetchProductDetail';

const ProductDetail = () => {
	const { id } = useParams();

	// Extract the correct product from the data.
	const { product, loading, error } = useFetchProductDetail(id!);

	return (
		<>
			{
				(loading &&
					<p> Loading the product...</p>)
				||
				(error && 
					<section>
						<p>There was an error!</p>
						<p> {error.message}</p>
					</section>
				)
				|| null !== product
				&&
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
							<AddToCartBtn btnText='Add to Cart' data={product} />
						</div>
					</section>
				}
		</>
	);
};

export default ProductDetail;
