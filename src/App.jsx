import './App.scss';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function App() {
	const [cartItems, setCartItems] = useState([]);
	const totalItemsInCart = () => {
		let result = cartItems.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.quantity;
		}, 0);
		return result;
	};

	return (
		<div className="font-sans text-teal-950 grid gap-4 min-h-screen grid-rows-[auto_1fr_auto]">
			<header className="bg-teal-200 shadow-lg shadow-teal-200">
				<div className="container mx-auto p-8 mb-2 flex flex-col md:flex-row items-center  gap-4 text-center justify-between ">
					<h1>
						<Link
							to="/"
							className="text-2xl italic hover:text-orange-400"
						>
							THE IMPULSE SHOPPER
						</Link>
					</h1>
					<Nav cartItemCount={totalItemsInCart()} />
				</div>
			</header>
			<main className="container mx-auto">
				<Outlet context={[cartItems, setCartItems]} />
			</main>
			<footer className="bg-teal-200 shadow-teal-200 shadow-[0px_-5px_10px] text-center py-8 text-lg">
				<p className="container flex justify-center gap-2 items-center mx-auto text-xl">
					Copyright 2024
					<a
						className="justify-center items-center flex gap-2"
						target="_blank"
						href="https://github.com/PetrusMaximus0"
					>
						@ Pedro Silva
						<i className="devicon-github-original"></i>
					</a>
				</p>
			</footer>
		</div>
	);
}

export default App;
