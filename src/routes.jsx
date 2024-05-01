import App from './App';
import ErrorPage from './components/error';
import Home from './components/home';
const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/products',
				element: <h1>This is a store</h1>,
			},
			{
				path: '/products/:id',
				element: <h1>Product with id </h1>,
			},
			{
				path: '/cart',
				element: <h1>This is the shopping cart!</h1>,
			},
		],
	},
];

export default routes;
