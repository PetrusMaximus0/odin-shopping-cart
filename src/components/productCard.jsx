import PropTypes from 'prop-types';

const ProductCard = ({ data }) => {
	return (
		<li className="">
			<h1 className="text-xl">Product {data.title}</h1>
			<p className="text-sm">{data.description}</p>
		</li>
	);
};

ProductCard.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ProductCard;
