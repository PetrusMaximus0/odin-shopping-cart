import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import routes from '../src/routes';
import "@testing-library/jest-dom";

describe('App component', () => {
	vi.mock('../src/components/Home', () => ({
		default: () => {
			return <p>homepage element</p>;
		},
	}));
	vi.mock('../src/components/ProductList', () => ({
		default: () => {
			return <p>products element</p>;
		},
	}));
	vi.mock('../src/components/ProductDetail', () => ({
		default: () => {
			return <p>product Detail element</p>;
		},
	}));
	vi.mock('../src/components/Cart', () => ({
		default: () => {
			return <p>cart element</p>;
		},
	}));

	describe('In the header...', () => {
		it('renders the heading with the store name', () => {
			const router = createMemoryRouter(routes, {
				initialEntries: ['/'],
				initialIndex: 0,
			});
			render(<RouterProvider router={router} />);

			// The heading is there and has the text content
			const headingElement = screen.queryByText(/the impulse shopper/i) as HTMLElement;
			expect(headingElement).toBeInTheDocument();
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
