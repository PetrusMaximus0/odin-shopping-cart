import { useState } from 'react';
import CartItem from './cartItem';
const Cart = () => {
	const mockProduct = [
		{
			id: 1,
			title: 'Product Title asdsa asd asd asd asd asd asd asd',
			quantity: 2,
			price: 230,
			image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
		},
		{
			id: 2,
			title: 'Product Title',
			quantity: 3,
			price: 230,
			image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
		},
	];

	const [products, setProducts] = useState(mockProduct);

	return (
		<section className="container main-animate flex flex-col my-4 mx-auto px-8 gap-4">
			<h1 className="text-4xl text-center sm:text-left text-white">
				Your Order
			</h1>
			<ul className="flex flex-col items-start w-full">
				{products.map((item) => {
					return <CartItem key={item.id} item={item} />;
				})}
			</ul>
			<p className="text-2xl text-right">
				Total: <span className="font-semibold">250€</span>
			</p>
			<button className="px-4 py-1 bg-orange-300 hover:bg-teal-500 hover:text-orange-300 text-teal-950 rounded-xl w-fit mx-auto text-2xl font-light">
				Checkout
			</button>
		</section>
	);
};

export default Cart;
