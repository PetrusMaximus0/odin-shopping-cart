import App from './App';
import ErrorPage from './components/error';
const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <h1>This is HOME</h1>,
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
