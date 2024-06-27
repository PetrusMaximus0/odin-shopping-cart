import { expect, it, describe, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ProductCard from '../../src/components/ProductCard';
import { render, screen } from '@testing-library/react';

vi.mock('../../src/components/AddToCartBtn', () => ({
	default: () => {
		return <button>AddToCart</button>;
	},
}));

describe('Product Card component', () => {
	const product = {
		id: 13,
		title: 'Title Product',
		price: 700,
		image: 'link',
	};

	const getRouter = (productData) => {
		const routes = [
			{
				path: '/',
				element: <ProductCard data={productData} />,
			},
		];
		return createMemoryRouter(routes);
	};

	it('renders the product title and price', () => {
		// Render the component
		render(<RouterProvider router={getRouter(product)} />);

		// Find the title
		expect(
			screen.queryByText(`Product ${product.title}`)
		).toBeInTheDocument();

		// Find the Price
		expect(screen.queryByText(`${product.price} €`)).toBeInTheDocument();
	});

	it('sets the correct href to the link for the product detail page ', () => {
		// Render the component
		render(<RouterProvider router={getRouter(product)} />);

		//confirm the product detail link href
		expect(screen.queryByRole('link')).toHaveAttribute(
			'href',
			`/products/${product.id}`
		);
	});

	it('sets the image src according to product data', () => {
		// Render the component
		render(<RouterProvider router={getRouter(product)} />);

		// confirm the img src
		const imgElement = screen.queryByRole('img');
		expect(imgElement).toHaveAttribute('src', product.image);
	});
});
