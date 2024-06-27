import App from './App';
import ErrorPage from './components/Error';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import CartContextProvider from './components/CartContextProvider';

const routes = [
	{
		path: '/',
		element: (
			<CartContextProvider>
				<App />
			</CartContextProvider>
		),
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
