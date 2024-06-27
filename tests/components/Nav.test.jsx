import { describe, it } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import CartContext from '../../src/contexts/CartContext';
import Nav from '../../src/components/Nav';

describe('Nav component', () => {
	const getRouter = (items) =>
		createMemoryRouter([
			{
				path: '/',
				element: (
					<CartContext.Provider value={{ cartItems: items }}>
						<Nav />
					</CartContext.Provider>
				),
			},
		]);

	it('presents only the text for the cart icon when no items are in the cart', () => {
		const cartItems = [];

		render(<RouterProvider router={getRouter(cartItems)} />);

		expect(screen.queryByText('Cart')).toBeInTheDocument();
	});

	it('presents the correct number of items for the cart icon if there is a single item type', () => {
		const cartItems = [{ quantity: 10 }];

		render(<RouterProvider router={getRouter(cartItems)} />);

		expect(screen.queryByText('Cart (10)')).toBeInTheDocument();
	});

	it('presents the correct number of items for the cart icon, if there are different item types', () => {
		const cartItems = [{ quantity: 5 }, { quantity: 3 }, { quantity: 2 }];

		render(<RouterProvider router={getRouter(cartItems)} />);

		expect(screen.queryByText('Cart (10)')).toBeInTheDocument();
	});
});
