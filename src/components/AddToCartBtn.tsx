import PropTypes from 'prop-types';
import { useState, useContext, FormEvent } from 'react';
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus, mdiCheckCircleOutline } from '@mdi/js';
import CartContext from '../contexts/CartContext';
import { IProduct } from '../interfaces';

const AddToCartBtn = ({data, btnText} : { data: IProduct, btnText: string }) => {
	//
	const [altBtnText, setAltBtnText] = useState<string|null>(null);

	// Number of items to add to the cart
	const [num, setNum] = useState(1);

	//
	const incNum = () => {
		setNum(num + 1);
	};

	//
	const decNum = () => {
		if (num > 1) {
			setNum(num - 1);
		} else {
			setNum(1);
		}
	};

	//
	const { cartItems, setCartItems } = useContext(CartContext);

	const handleAddToCart = (number : number) => {
		//
		const newCartItems = [...cartItems];

		// Check if the product is in the cart already.
		const index = newCartItems.findIndex((item) => data.id === item.id);

		if (index !== -1) {
			//The product is in the cart, add quantity.
			newCartItems[index].quantity += number;

			//
			setCartItems(newCartItems);
		} else {
			// The product is not in the cart, add a new entry for this product
			setCartItems([...cartItems, { ...data, quantity: number }]);
		}
	};

	// Form Submission Callback
	const submitForm = (e : FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isNaN(num) && num >= 1) {
			// Add the items to the cartItems State
			handleAddToCart(num);
			setNum(1);
			setAltBtnText(`Item Added`);
			
			// 
			const timeOutId = setTimeout(()=>{
				clearTimeout(timeOutId);
				setAltBtnText(null);
			}, 2000);
		}
	};

	const handleInputChange = (e : FormEvent<HTMLInputElement>) => {
		setNum(parseInt(e.currentTarget.value));
	};

	return (
		<form
			className="flex justify-between items-center gap-1 w-full"
			onSubmit={submitForm}
			action=""
		>
			<div className="flex justify-center items-center gap-1">
				<button
					aria-label="decrease items"
					className="hover:bg-red-500 active:bg-accent active:text-white rounded-xl"
					onClick={decNum}
					type="button"
				>
					<Icon path={mdiMinus} size={1} />
				</button>
				<input
					aria-label="product number"
					className="w-16 rounded-xl bg-neutral text-center"
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
					className="hover:bg-teal-500 active:bg-accent active:text-white rounded-xl"
					onClick={incNum}
					type="button"
				>
					<Icon path={mdiPlus} size={1} />
				</button>
			</div>
			<button
				type="submit"
				className="text-lg active:bg-accent active:text-neutral hover:border hover:border-accent bg-neutral text-complementary font-bold rounded-2xl w-32 px-1 py-1"
			>
				{altBtnText || btnText}
			</button>
			<Icon
				className={altBtnText !== null ? 'text-teal-500' : 'invisible'}
				path={mdiCheckCircleOutline}
				size={2}
			/>
		</form>
	);
};

AddToCartBtn.propTypes = {
	data: PropTypes.object,
	btnText: PropTypes.string,
};

export default AddToCartBtn;
