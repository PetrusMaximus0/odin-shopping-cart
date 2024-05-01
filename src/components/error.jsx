import { Link } from 'react-router-dom';

const ErrorPage = () => {
	return (
		<div className="text-center font-light text-5xl text-white p-20">
			<h1>Woops, something went wrong!</h1>
			<p>The route you tried to access doesn&apos;t exist.</p>
			<Link className="text-blue-500" to="/">
				Return Home
			</Link>
		</div>
	);
};

export default ErrorPage;
