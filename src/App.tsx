import './App.scss';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
import {Link, Outlet} from 'react-router-dom';
import Nav from './components/Nav';

function App() {
	return (
		<div className="walter-turncoat-regular text-teal-950 grid min-h-screen grid-rows-[auto_1fr_auto]">
			<header className="bg-neutral">
				<div className="container mx-auto py-8 sm:px-8 mb-2 flex flex-col md:flex-row items-center gap-4 text-center justify-between ">
					<h1> 
						<Link
						to="/"
						className="text-3xl text-logoText uppercase"
						>
							impulse shopper
						</Link> 
					</h1>
					<Nav />
				</div>
			</header>
			<main className="bg-gradient-to-b from-neutral via-primary to-neutral">
				<div className="container mx-auto">
					<Outlet />
				</div>
			</main>
			<footer className="text-center py-8 text-lg bg-neutral">
				<p className="container flex justify-center gap-2 items-center mx-auto text-sm text-complementary">
					Copyright 2024
					<a
						className="justify-center items-center flex gap-2"
						target="_blank"
						href="https://github.com/PetrusMaximus0"
					>
						@ Pedro Silva
						<Icon path={mdiGithub} size={1} />
					</a>
				</p>
			</footer>
		</div>
	);
}

export default App;
