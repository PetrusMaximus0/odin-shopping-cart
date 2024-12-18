import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiPlus, mdiMinus } from '@mdi/js';
import { Link } from 'react-router-dom';
import { useContext, FormEvent } from 'react';
import CartContext from '../contexts/CartContext';
import { ICartItem } from '../interfaces';

const CartItem = ({ item }:{item: ICartItem}) => {
	//
	const { cartItems, setCartItems } = useContext(CartContext);

	//
	const handleNumChange = (e: FormEvent<HTMLInputElement>) => {
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((element) => element.id === item.id);
		if (index !== -1) {
			newCartItems[index].quantity = parseInt(e.currentTarget.value);
			setCartItems(newCartItems);
		}
	};

	//
	const incrementNum = () => {
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((element) => element.id === item.id);
		if (index !== -1) {
			newCartItems[index].quantity += 1;
			setCartItems(newCartItems);
		}
	};

	//
	const decrementNum = () => {
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((element) => element.id === item.id);
		if (index !== -1) {
			if (newCartItems[index].quantity > 1) {
				newCartItems[index].quantity -= 1;
				setCartItems(newCartItems);
			}
		}
	};

	//
	const removeItem = () => {
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((element) => element.id === item.id);
		if (index !== -1) {
			newCartItems.splice(index, 1);
			setCartItems(newCartItems);
		}
	};

	return (
		<div
			className="bg-primary my-4 rounded-xl w-full items-center grid grid-rows-[auto_1fr_1fr] grid-cols-1 sm:grid-cols-[8rem_auto_1fr] gap-8 py-4 px-2"
			key={item.id}
		>
			<figure className="row-span-3 max-w-32 mx-auto">
				<img className="" src={item.image} alt="Product Image" />
			</figure>
			<Link
				to={`/products/${item.id}`}
				className="col-span-2 text-lg font-semibold"
			>
				{item.title}
			</Link>
			<div className="col-span-2 w-full flex justify-between items-center">
				<fieldset className=" flex justify-center">
					<label htmlFor="quantity" className="mr-4 text-lg">
						Quantity:{' '}
					</label>
					<button
						aria-label="decrease items"
						onClick={decrementNum}
						type="button"
					>
						<Icon path={mdiMinus} size={1} />
					</button>
					<input
						id="quantity"
						type="number"
						min={1}
						max={10}
						required
						onChange={handleNumChange}
						className="max-w-12 h-full text-center bg-inherit"
						value={item.quantity}
					/>
					<button
						aria-label="increase items"
						onClick={incrementNum}
						type="button"
					>
						<Icon path={mdiPlus} size={1} />
					</button>
				</fieldset>
				<p className="text-xl">
					Total: {(item.quantity * item.price).toFixed(2)} €
				</p>
			</div>
			<button
				onClick={removeItem}
				className=" text-complementary col-span-2 w-fit px-6 py-1 mx-auto sm:mx-0 rounded-3xl bg-red-600 hover:border-accent border border-transparent"
			>
				Remove
			</button>
		</div>
	);
};

CartItem.propTypes = {
	item: PropTypes.object,
};

export default CartItem;
