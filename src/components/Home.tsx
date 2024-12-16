import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<section className="main-animate h-full flex flex-col justify-start items-center gap-14 text-teal-950 text-center my-8">
			<p className={"capitalize text-5xl"}>
				Don&apos;t think <br/>
				just
			</p>
			<Link
				className="hover:shadow-teal-950 hover:shadow-md active:shadow-none active:bg-teal-950 active:text-orange-400 bg-orange-400 text-7xl px-12 py-4 rounded-xl"
				to="/products"
			>
				Buy
			</Link>
			<figure className="w-full">
				<img  className={"mx-auto w-48 h-48"} src="/home.svg" alt="IMAGE" />
				<legend className="text-center font-thin text-xs">
					<a href="https://www.freepik.com/free-vector/flat-hand-drawn-people-shopping-sale-illustration_12151005.htm#query=shopping%20cartoon&position=8&from_view=keyword&track=ais&uuid=2e9ad00f-53a2-4387-bbdd-2c2599db3615">
						Image by Freepik
					</a>
				</legend>
			</figure>
		</section>
	);
};

export default Home;
