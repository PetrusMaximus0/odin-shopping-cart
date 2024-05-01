import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
	const { id } = useParams();

	return (
		<section>
			<h1>This is a detailed product page for id: {id}</h1>
			<p>Description here</p>
		</section>
	);
};

ProductDetail.propTypes = {
	product: PropTypes.object,
};

export default ProductDetail;
