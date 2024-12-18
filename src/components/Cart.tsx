import CartItem from './CartItem';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect, FormEvent } from 'react';
import CartContext from '../contexts/CartContext';

const Cart = () => {
	//
	const navigate = useNavigate();

	const { cartItems, setCartItems } = useContext(CartContext);

	const [orderPlaced, setOrderPlaced] = useState(false);

	//
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		//
		const newTotalPrice = cartItems.reduce(
			(accumulator, currentValue) =>
				accumulator + currentValue.price * currentValue.quantity,
			0
		);

		//
		setTotalPrice(newTotalPrice);
	}, [cartItems]);

	// Set up the order submission
	const handleOrderSubmit = (e: FormEvent) => {
		e.preventDefault();

		// Prevent submiting orders with NaN price values.
		if (isNaN(totalPrice)) {
			console.error('Error Submitting the Order');
			return;
		}

		// Simulate the routing to an order submission
		setOrderPlaced(true);
		setTimeout(() => {
			// Empty the cart to simulate a successful order submission
			setCartItems([]);
			// Redirect to the main page
			navigate('/');
		}, 2000);
	};

	//
	return (
		(cartItems.length > 0 && (
			<section className="text-complementary container main-animate flex flex-col my-4 mx-auto px-8 gap-4">
				<h1 className="text-4xl text-center sm:text-left">
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
							{totalPrice.toFixed(2)} €
						</span>
					</p>

					<button
						form="cart"
						type="submit"
						className="self-center w-fit px-4 py-1 bg-gradient-to-r from-ctaBgA to-ctaBgB hover:from-complementary hover:to-primary text-logoText rounded-lg text-2xl font-light"
					>
						Checkout
					</button>
				</div>
				{orderPlaced && (
					<>
						<p className="text-center text-2xl">Order Successful</p>
						<p className="text-center text-1xl ">
							Returning to Home page shortly.
						</p>
					</>
				)}
			</section>
		)) || (
			<section className="text-center text-complementary">
				<h1 className="text-4xl my-8 ">Your Cart is Empty</h1>
				<p className="font-light text-2xl">
					Would you like to{' '}
					<Link className="text-accent" to="/products">
						Browse our wares?
					</Link>
				</p>
			</section>
		)
	);
};

export default Cart;
