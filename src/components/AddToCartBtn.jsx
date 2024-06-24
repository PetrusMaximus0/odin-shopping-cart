import PropTypes from 'prop-types';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus, mdiCheckCircleOutline } from '@mdi/js';

const AddToCartBtn = ({ btnText = 'Add to Cart', handleFormSubmit }) => {
	const [altBtnText, setAltBtnText] = useState(null);

	const incNum = () => {
		setNum(parseInt(num + 1));
	};

	const decNum = () => {
		if (num > 1) {
			setNum(num - 1);
		} else {
			setNum(1);
		}
	};

	const submitForm = (e) => {
		e.preventDefault();
		if (!isNaN(num) && num >= 1) {
			handleFormSubmit(num);
			setNum(1);
			let timeNum = 3;
			setAltBtnText(`Item Added`);
			const intervalId = setInterval(() => {
				if (timeNum === 0) {
					clearInterval(intervalId);
					setAltBtnText(null);
				} else {
					timeNum -= 1;
				}
			}, 1000);
		}
	};

	const handleInputChange = (e) => {
		setNum(parseInt(e.target.value));
	};

	// Number that will be sent with the form on submit
	const [num, setNum] = useState(1);

	return (
		<form
			className="flex justify-between items-center gap-1"
			onSubmit={submitForm}
			action=""
		>
			<div className="flex justify-center items-center gap-1">
				<button
					aria-label="decrease items"
					className="hover:bg-teal-500 active:bg-orange-300 active:text-white rounded-xl"
					onClick={decNum}
					type="button"
				>
					<Icon path={mdiMinus} size={1} />
				</button>
				<input
					aria-label="product number"
					className="w-16 rounded-xl border border-teal-950 text-center"
					min={1}
					max={10}
					type="number"
					name="productNumber"
					id="productNumber"
					required
					value={num}
					onChange={handleInputChange}
				/>
				<button
					aria-label="increase items"
					className="hover:bg-teal-500 active:bg-orange-300 active:text-white rounded-xl"
					onClick={incNum}
					type="button"
				>
					<Icon path={mdiPlus} size={1} />
				</button>
			</div>

			<button
				type="submit"
				className="hover:bg-teal-500 text-white bg-orange-300 active:bg-orange-300 rounded-xl px-4 py-1"
			>
				{altBtnText || btnText}
			</button>
			<Icon
				className={altBtnText !== null ? 'text-teal-500' : 'invisible'}
				path={mdiCheckCircleOutline}
				size={1}
			/>
		</form>
	);
};

AddToCartBtn.propTypes = {
	handleFormSubmit: PropTypes.func.isRequired,
	btnText: PropTypes.string,
};

export default AddToCartBtn;
