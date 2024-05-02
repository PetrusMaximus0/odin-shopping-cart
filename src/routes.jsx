import App from './App';
import ErrorPage from './components/error';
import Home from './components/home';
import ProductList from './components/productList';
import ProductDetail from './components/productDetail';
import Cart from './components/cart';
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
				element: <Cart />,
			},
		],
	},
];

export default routes;
