import { describe, it } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Nav from '../../src/components/Nav';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

describe('Nav component', () => {
	it('presents only the text for the cart icon when no items are in the cart', () => {
		const router = createMemoryRouter([
			{
				path: '/',
				element: <Nav />,
			},
		]);
		render(<RouterProvider router={router} />);
		expect(screen.queryByText(/Cart/)).toBeInTheDocument();
	});

	it('presents the correct number of items in the cart when the number is a positive integer', () => {
		const routerItems = createMemoryRouter([
			{
				path: '/',
				element: <Nav cartItemCount={10} />,
			},
		]);
		render(<RouterProvider router={routerItems} />);
		expect(screen.queryByText('Cart (10)')).toBeInTheDocument();
	});

	it('presents only the text when it receives errouneously something other than a positive integer', () => {
		const routerItems = createMemoryRouter([
			{
				path: '/',
				element: <Nav cartItemCount={'a'} />,
			},
		]);
		render(<RouterProvider router={routerItems} />);
		expect(screen.queryByText('Cart')).toBeInTheDocument();
	});
});
