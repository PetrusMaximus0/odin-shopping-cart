import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
	const routes = [
		{
			path: '/',
			element: <App />,
			children: [
				{
					path: '/',
					element: <p>homepage element</p>,
				},
				{
					path: '/products',
					element: <p>products element</p>,
				},
				{
					path: '/cart',
					element: <p>cart element</p>,
				},
			],
		},
	];

	describe('In the header...', () => {
		it('renders the heading with the store name', () => {
			const router = createMemoryRouter(routes, {
				initialEntries: ['/'],
				initialIndex: 0,
			});
			render(<RouterProvider router={router} />);

			// The heading is there and has the text content
			const headingElement = screen.getByRole('heading');
			expect(headingElement).toHaveTextContent(/the impulse shopper/i);
		});

		it('clicking the heading link brings us to the homepage', async () => {
			//
			const router2 = createMemoryRouter(routes, {
				initialEntries: ['/products', '/'],
				initialIndex: 0,
			});

			//
			render(<RouterProvider router={router2} />);

			// Assert that we are NOT in the homepage
			expect(screen.queryByText(/homepage element/i)).toBeFalsy();

			//
			const linkElement = screen.getByText(/the impulse shopper/i);

			// Set up the events.
			const user = userEvent.setup();
			await user.click(linkElement);

			// Click the heading link and check if we are at the home page
			await waitFor(() => {
				expect(screen.getByText(/homepage element/i)).toBeInTheDocument();
			});
		});

		it('all nav bar links are present and link to the correct page', async () => {
			const router = createMemoryRouter(routes, {
				initialEntries: ['/', '/products', '/cart'],
				initialIndex: 0,
			});

			render(<RouterProvider router={router} />);

			// setup user
			const user = userEvent.setup();

			// Assert we begin on the home page
			expect(screen.queryByText(/homepage element/)).toBeInTheDocument();

			// Check cart link
			const cartLink = screen.getByRole('link', { name: /cart/i });
			await user.click(cartLink);
			waitFor(() => {
				expect(screen.queryByText(/cart element/i)).toBeInTheDocument();
			});

			// Check products link
			const productsLink = screen.getByRole('link', { name: /products/i });
			await user.click(productsLink);
			waitFor(() => {
				expect(screen.queryByText(/products element/i)).toBeInTheDocument();
			});

			// Check home link
			const homeLink = screen.getByRole('link', {
				name: /home/i,
			});
			await user.click(homeLink);
			waitFor(() => {
				expect(screen.queryByText(/home element/i)).toBeInTheDocument();
			});
		});
	});
});
