// Fetch must be mocked, and a result must be sent ?

import { describe, it, expect, vi } from 'vitest';
import ProductList from '../../src/components/ProductList';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { waitFor, render, screen } from '@testing-library/react';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

// We mock the product card element because we are not interested in testing its functionality in this testing file.
vi.mock('../../src/components/ProductCard', () => ({
	default: () => {
		return <li> item </li>;
	},
}));

describe('ProductList component', () => {
	const routes = [
		{
			path: '/products',
			element: <ProductList />,
		},
	];

	it('shows a loading message when request products and an error message when the request receives an error response', async () => {
		// Create the router
		const router = createMemoryRouter(routes, {
			initialEntries: ['/products'],
			initialIndex: 0,
		});

		//
		render(<RouterProvider router={router} />);

		// Assert the loading message
		const loadingMessage = screen.getByText(/loading/i);
		expect(loadingMessage).toBeInTheDocument();

		// Assert the error message
		await waitFor(() => {
			const errMessage = screen.getAllByText(/error/i);
			expect(errMessage.length).toBeGreaterThanOrEqual(1);
		});

		screen.debug();

		//
	});

	it('It renders a list of items based on the fetch response', async () => {
		// We are not testing the content of the list items because the list item is another component.
		// Override the fetch request
		server.use(
			http.get('https://fakestoreapi.com/products', () => {
				// Respond to the request with this JSON response:
				return HttpResponse.json([
					{
						id: 1,
					},
					{
						id: 2,
					},
					{
						id: 3,
					},
				]);
			}),
			{ once: true }
		);
		// Create the router
		const router = createMemoryRouter(routes, {
			initialEntries: ['/products'],
			initialIndex: 0,
		});

		//
		render(<RouterProvider router={router} />);

		await waitFor(() => {
			//
			const ulElement = screen.queryByRole('list');
			expect(ulElement).toBeInTheDocument();
			//
			const liElement = screen.queryAllByRole('listitem');
			expect(liElement).toHaveLength(3);
		});

		screen.debug();
	});
});
