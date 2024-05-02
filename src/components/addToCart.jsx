import PropTypes from 'prop-types';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus } from '@mdi/js';

const AddToCartBtn = ({ btnText = 'Add to Cart', handleFormSubmit }) => {
	const incNum = () => {
		setNum(num + 1);
	};

	const decNum = () => {
		if (num > 1) {
			setNum(num - 1);
		}
	};

	const submitForm = (e) => {
		e.preventDefault();
		setNum(1);
		// Returns the number to add.
		handleFormSubmit(num);
	};

	// Number that will be sent with the form on submit
	const [num, setNum] = useState(1);

	return (
		<form
			className="flex justify-center gap-2"
			onSubmit={submitForm}
			action=""
		>
			<div className="flex justify-center items-center gap-1">
				<button
					className="hover:bg-teal-500 active:bg-orange-300 active:text-white rounded-xl"
					onClick={decNum}
					type="button"
				>
					<Icon path={mdiMinus} size={1} />
				</button>
				<input
					className="w-16 rounded-xl border border-teal-950 text-center"
					type="text"
					name="productNumber"
					id="productNumber"
					value={num}
					disabled
				/>
				<button
					className="hover:bg-teal-500 active:bg-orange-300 active:text-white rounded-xl"
					onClick={incNum}
					type="button"
				>
					<Icon path={mdiPlus} size={1} />
				</button>
			</div>
			<button className="hover:bg-teal-500 text-white bg-orange-300 active:bg-orange-300 rounded-xl px-4 py-1">
				{btnText}
			</button>
		</form>
	);
};

AddToCartBtn.propTypes = {
	handleFormSubmit: PropTypes.func.isRequired,
	btnText: PropTypes.string,
};

export default AddToCartBtn;
