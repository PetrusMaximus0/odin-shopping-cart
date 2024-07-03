import { describe, expect, it } from 'vitest';
import Home from '../../src/components/Home';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Home component', () => {
	describe('Call to action', () => {
		it('Redirects to the products page when clicked', async () => {
			// Set up routes and router
			const routes = [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/products',
					element: <p>products page</p>,
				},
			];

			//
			const router = createMemoryRouter(routes, {
				initialEntries: ['/'],
				initialIndex: 0,
			});

			//
			render(<RouterProvider router={router} />);

			// Get the link element
			const CTA = screen.getByText(/buy/i);

			// Set up user click
			const user = userEvent.setup();
			await user.click(CTA);

			//
			await waitFor(() =>
				expect(screen.queryByText(/products page/i)).toBeInTheDocument()
			);
		});
	});
});
