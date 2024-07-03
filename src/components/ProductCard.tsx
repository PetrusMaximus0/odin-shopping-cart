import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IProduct } from '../interfaces';
import AddToCartBtn from './AddToCartBtn';

const ProductCard = ({ data } : { data: IProduct }) => {
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
			<AddToCartBtn btnText={'Add to Cart'} data = { data } />
		</li>
	);
};

ProductCard.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ProductCard;
