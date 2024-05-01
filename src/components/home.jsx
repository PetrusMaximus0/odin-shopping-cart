import { Link } from 'react-router-dom';
const Home = () => {
	return (
		<section className="main-animate h-full flex flex-row flex-wrap justify-around items-center">
			<div className="text-center">
				<h1 className="text-orange-400 text-5xl my-4"> Impulse Shopper </h1>
				<p className="text-2xl my-8 flex gap-4 items-center justify-center">
					Don&apos;t think, just
					<Link
						className="hover:bg-orange-300 hover: max-w-fit text-2xl px-6 py-1 bg-slate-400 text-teal-950 rounded-xl"
						to="/products"
					>
						Buy
					</Link>
				</p>
			</div>
			<figure className="w-80 h-auto">
				<img src="/home.svg" alt="IMAGE" />
				<legend className="text-center font-thin text-xs">
					Image by{' '}
					<a href="https://www.freepik.com/free-vector/flat-hand-drawn-people-shopping-sale-illustration_12151005.htm#query=shopping%20cartoon&position=8&from_view=keyword&track=ais&uuid=2e9ad00f-53a2-4387-bbdd-2c2599db3615">
						Freepik
					</a>
				</legend>
			</figure>
		</section>
	);
};

export default Home;
