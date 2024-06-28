import ProductDetail from '../../src/components/ProductDetail';
//
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
//
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
//
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
//

vi.mock('../../src/components/AddToCartBtn', () => ({
	default: () => <button> Add to Cart </button>,
}));

describe('Product Detail Component', () => {
	const routes = [
		{
			path: '/products/:id',
			element: <ProductDetail />,
		},
	];

	const router = createMemoryRouter(routes, {
		initialEntries: ['/products/1'],
	});

	it('Fetches the product by ID and correctly presents it', async () => {
		const product = {
			title: 'product title',
			description: 'product description',
			image: 'product image src',
			price: 1000,
		};

		server.use(
			http.get('https://fakestoreapi.com/products/:id', () => {
				return HttpResponse.json(product);
			})
		);
		render(<RouterProvider router={router} />);

		expect(screen.queryByText(/loading/i)).toBeInTheDocument();

		await waitFor(() => {
			//
			expect(screen.queryByText(`${product.title}`)).toBeInTheDocument();

			//
			expect(
				screen.queryByText(`${product.description}`)
			).toBeInTheDocument();

			//
			expect(screen.queryByText(`${product.price}€`)).toBeInTheDocument();

			//
			expect(screen.getByRole('img')).toHaveAttribute(
				'src',
				`${product.image}`
			);
		});
	});

	it('Returns an error message when the fetch response has an error', async () => {
		render(<RouterProvider router={router} />);

		await waitFor(() => {
			expect(screen.queryByText(/error/i));
			screen.debug();
		});
	});
});
