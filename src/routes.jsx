import App from './App';
import ErrorPage from './components/error';
import Home from './components/home';
import ProductList from './components/productList';
import ProductDetail from './components/productDetail';
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
				element: <ProductList />,
			},
			{
				path: '/products/:id',
				element: <ProductDetail />,
			},
			{
				path: '/cart',
				element: <h1>This is the shopping cart!</h1>,
			},
		],
	},
];

export default routes;
