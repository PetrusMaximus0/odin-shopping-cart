import { describe, it, expect, vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';

import Cart from '../../src/components/Cart';
import CartContext from '../../src/contexts/CartContext';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { useState } from 'react';

vi.mock('../../src/components/CartItem', () => ({
	default: () => <div> Item Card </div>,
}));

//
describe('Cart Component', () => {
	//
	const CartWrapper = ({ items }) => {
		const [cartItems, setCartItems] = useState(items);
		return (
			<CartContext.Provider value={{ cartItems, setCartItems }}>
				<Cart />
			</CartContext.Provider>
		);
	};

	//
	const getRouter = (products) =>
		createMemoryRouter(
			[
				{
					path: '/',
					element: <div>Homepage</div>,
				},
				{
					path: '/cart',
					element: <CartWrapper items={products} />,
				},
			],
			{
				initialEntries: ['/cart', '/'],
				initialIndex: 0,
			}
		);

	it('shows redirect to the store when the cart is empty', () => {
		render(<RouterProvider router={getRouter([])} />);
		const link = screen.getByRole('link', { name: 'Browse our wares?' });
		expect(link).toHaveAttribute('href', '/products');
	});

	it('shows the correct number of cart items when there are items in the cart as well as the correct total price', () => {
		const products = [
			{ id: 1, price: 1000, quantity: 1 },
			{ id: 2, price: 2000, quantity: 2 },
			{ id: 3, price: 1000, quantity: 1 },
			{ id: 4, price: 1000, quantity: 3 },
		];

		const totalPrice = products.reduce(
			(accumulator, currentValue) =>
				accumulator + currentValue.price * currentValue.quantity,
			0
		);

		render(<RouterProvider router={getRouter(products)} />);

		//
		const items = screen.queryAllByText('Item Card');
		expect(items.length === products.length).toBeTruthy();

		// Shows the price correctly
		const total = screen.queryByText(`${totalPrice.toFixed(2)} €`);
		expect(total).toBeInTheDocument();
	});

	it('fake submits successfuly on Checkout', async () => {
		const products = [{ id: 1, price: 1000, quantity: 1 }];

		render(<RouterProvider router={getRouter(products)} />);

		const user = userEvent.setup();
		const checkoutBtn = screen.getByRole('button', { name: 'Checkout' });
		await user.click(checkoutBtn);

		await waitFor(() => {
			expect(screen.queryByText('Order Successful')).toBeInTheDocument();
			expect(
				screen.queryByText('Returning to Home page shortly.')
			).toBeInTheDocument();
		});

		await waitFor(
			() => {
				expect(screen.queryByText('Homepage')).toBeInTheDocument();
				expect(
					screen.queryByText('Order Successful')
				).not.toBeInTheDocument();
			},
			{ timeout: 2100 }
		);
	});

	it("doesn't submit the order if the total price is invalid.", async () => {
		const products = [{ id: 1, price: 'a', quantity: 1 }];

		render(<RouterProvider router={getRouter(products)} />);

		const user = userEvent.setup();
		const checkoutBtn = screen.getByRole('button', { name: 'Checkout' });
		await user.click(checkoutBtn);

		await waitFor(() => {
			expect(screen.queryByText('NaN €')).toBeInTheDocument();
			expect(
				screen.queryByText('Returning to Home page shortly.')
			).not.toBeInTheDocument();
		});
	});
});
