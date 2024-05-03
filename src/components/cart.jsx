import CartItem from './cartItem';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const Cart = () => {
	const [cartItems, setCartItems] = useOutletContext();
	const updateTotal = () => {
		let result = cartItems.reduce(
			(accumulator, currentValue) =>
				accumulator + currentValue.price * currentValue.quantity,
			0
		);
		return result;
	};

	const handleOrderSubmit = (e) => {
		e.preventDefault();
		const formBody = [];
		const result = updateTotal();
		if (isNaN(result)) {
			console.error('Error Submitting the Order');
			return;
		}
		cartItems.forEach((item) =>
			formBody.push({
				id: item.id,
				price: item.price,
				quantity: item.quantity,
			})
		);
		console.log(JSON.stringify(formBody));
	};
	return (
		(cartItems.length > 0 && (
			<section className="container main-animate flex flex-col my-4 mx-auto px-8 gap-4">
				<h1 className="text-4xl text-center sm:text-left text-white">
					Your Order
				</h1>
				<form
					onSubmit={handleOrderSubmit}
					id="cart"
					className="flex flex-col items-start w-full"
				>
					{cartItems.map((item) => {
						return <CartItem key={item.id} item={item} />;
					})}
				</form>

				<div className="flex flex-col items-end">
					<p className="text-2xl ">
						Total:{' '}
						<span className="font-semibold">
							{updateTotal().toFixed(2)} €
						</span>
					</p>

					<button
						form="cart"
						type="submit"
						className="self-center w-fit px-4 py-1 bg-orange-300 hover:bg-teal-500 hover:text-orange-300 text-teal-950 rounded-xl text-2xl font-light"
					>
						Checkout
					</button>
				</div>
			</section>
		)) || (
			<section className="text-center">
				<h1 className="text-4xl my-8 ">Your Cart is Empty</h1>
				<p className="font-light text-2xl">
					Would you like to
					<Link className="text-orange-600" to="/products">
						{' '}
						Browse our wares?
					</Link>
				</p>
			</section>
		)
	);
};

export default Cart;
