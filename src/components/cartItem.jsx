import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiPlus, mdiMinus } from '@mdi/js';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
	const [cartItems, setCartItems] = useOutletContext();
	const handleNumChange = (e) => {
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((element) => element.id === item.id);
		if (index !== -1) {
			newCartItems[index].quantity = parseInt(e.target.value);
			setCartItems(newCartItems);
		} else {
			console.error('Error!');
		}
	};

	const incrementNum = () => {
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((element) => element.id === item.id);
		if (index !== -1) {
			newCartItems[index].quantity += 1;
			setCartItems(newCartItems);
		} else {
			console.error("Couldn't find the item");
		}
	};

	const decrementNum = () => {
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((element) => element.id === item.id);
		if (index !== -1) {
			if (newCartItems[index].quantity > 1) {
				newCartItems[index].quantity -= 1;
				setCartItems(newCartItems);
			}
		} else {
			console.error("Couldn't find the item");
		}
	};

	const removeItem = () => {
		const newCartItems = [...cartItems];
		const index = newCartItems.findIndex((element) => element.id === item.id);
		if (index !== -1) {
			newCartItems.splice(index, 1);
			setCartItems(newCartItems);
		} else {
			console.error("Couldn't find the item");
		}
	};

	return (
		<div
			className="bg-white my-4 rounded-xl text-teal-950 w-full items-center grid grid-rows-[auto_1fr_1fr] grid-cols-1 sm:grid-cols-[8rem_auto_1fr] gap-8 py-4 px-2"
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
				<div className=" flex justify-center" action="">
					<p className="mr-4 text-lg">Quantity: </p>
					<button onClick={decrementNum} type="button">
						<Icon path={mdiMinus} size={1} />
					</button>
					<input
						type="number"
						min={1}
						max={10}
						required
						onChange={handleNumChange}
						className="max-w-12 h-full text-center bg-inherit"
						value={item.quantity}
					/>
					<button onClick={incrementNum} type="button">
						<Icon path={mdiPlus} size={1} />
					</button>
				</div>
				<p className="text-xl">
					Total: {(item.quantity * item.price).toFixed(2)} €
				</p>
			</div>
			<button
				onClick={removeItem}
				className=" text-white col-span-2 w-fit px-6 py-1 mx-auto sm:mx-0 rounded-3xl bg-orange-300 hover:bg-teal-500"
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
