import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiPlus, mdiMinus } from '@mdi/js';

const CartItem = ({ item }) => {
	return (
		<li
			className="bg-white my-4 rounded-xl text-teal-950 w-full items-center grid grid-rows-[auto_1fr_1fr] grid-cols-1 sm:grid-cols-[8rem_auto_1fr] gap-8 py-4 px-2"
			key={item.id}
		>
			<figure className="row-span-3 max-w-32 mx-auto">
				<img className="" src={item.image} alt="Product Image" />
			</figure>
			<p className="col-span-2 text-lg font-semibold">{item.title}</p>
			<div className="col-span-2 w-full flex justify-between items-center">
				<form className=" flex justify-center" action="">
					<p className="mr-4 text-lg">Quantity: </p>
					<button type="button">
						<Icon path={mdiMinus} size={1} />
					</button>
					<input
						type="text"
						disabled
						className="max-w-4 h-full text-center bg-inherit"
						value={item.quantity}
					/>
					<button type="button">
						<Icon path={mdiPlus} size={1} />
					</button>
				</form>
				<p className="text-xl">Total: {item.quantity * item.price} €</p>
			</div>
			<button className=" text-white col-span-2 w-fit px-6 py-1 mx-auto sm:mx-0 rounded-3xl bg-orange-300 hover:bg-teal-500">
				Remove
			</button>
		</li>
	);
};

CartItem.propTypes = {
	item: PropTypes.object,
};

export default CartItem;
