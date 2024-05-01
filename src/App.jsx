import './App.scss';
import { Outlet } from 'react-router-dom';
import Nav from './components/nav';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function App() {
	const [cartItemCount, setCartItemCount] = useState(0);

	return (
		<div className="font-sans text-slate-200 grid gap-4 min-h-screen grid-rows-[auto_1fr_auto]">
			<header className="bg-teal-950 shadow-lg shadow-teal-950">
				<div className="container mx-auto p-8 mb-2 flex flex-col md:flex-row items-center  gap-4 text-center justify-between ">
					<Link to="/" className="text-2xl italic hover:text-orange-300">
						THE IMPULSE SHOPPER
					</Link>
					<Nav cartItemCount={cartItemCount} />
				</div>
			</header>
			<main className="container mx-auto">
				<Outlet context={[cartItemCount, setCartItemCount]} />
			</main>
			<footer className="bg-teal-950 shadow-teal-950 shadow-[0px_-5px_10px] text-center py-8 text-lg">
				<div className="container mx-auto">
					<span className="">Copyright 2024 Pedro Silva </span>
					<a target="_blank" href="https://github.com/PetrusMaximus0">
						<i className="devicon-github-original"></i>
					</a>
				</div>
			</footer>
		</div>
	);
}

export default App;
