import './App.scss';
import { Outlet } from 'react-router-dom';
import Nav from './components/nav';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
	const [cartItemCount, setCartItemCount] = useState(0);

	return (
		<div className="font-sans text-white grid gap-4 min-h-screen grid-rows-[auto_1fr_auto]">
			<header className="p-8 bg-teal-950 flex justify-between">
				<Link to="/" className="text-2xl">
					AWESOME STORE
				</Link>
				<Nav cartItemCount={cartItemCount} />
			</header>
			<main className="px-8">
				<Outlet context={[cartItemCount, setCartItemCount]} />
			</main>
			<footer className="bg-teal-950 text-center py-8 text-lg">
				<span className="">Copyright 2024 Pedro Silva </span>
				<a target="_blank" href="https://github.com/PetrusMaximus0">
					GITHUB_ICON
				</a>
			</footer>
		</div>
	);
}

export default App;
