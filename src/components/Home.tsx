import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<section className="main-animate h-full flex flex-col justify-start items-center gap-14 text-complementary text-center my-8">
			<p className={"capitalize text-5xl"}>
				Don&apos;t think
			</p>
			
			<Link
				className="bg-gradient-to-r hover:from-complementary hover:to-neutral from-ctaBgA to-ctaBgB text-logoText text-6xl w-80 h-32 flex justify-center items-center bg-white rounded-2xl"
				to="/products"
			>
				<span className={"capitalize text-4xl mr-2"}>just</span>
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
