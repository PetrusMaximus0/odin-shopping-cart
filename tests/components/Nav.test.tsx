import { describe, it } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import CartContext from '../../src/contexts/CartContext';
import Nav from '../../src/components/Nav';
import { ICartItem } from '../../src/interfaces';
import { useState } from 'react';

describe('Nav component', () => {

	const NavWrapper = ({ items }: { items: ICartItem[] }) => {
		
		const [cartItems, setCartItems] = useState<ICartItem[]>(items);

		return (
			<CartContext.Provider value={{ cartItems, setCartItems }}>
				<Nav />
			</CartContext.Provider>
		)
	}

	const getRouter = (cartItems : ICartItem[]) =>
		createMemoryRouter([
			{
				path: '/',
				element: <NavWrapper items={cartItems} />
			},
		]);

	it('presents only the text for the cart icon when no items are in the cart', () => {
		const cartItems : ICartItem[] = [];

		render(<RouterProvider router={getRouter(cartItems)} />);

		expect(screen.queryByText('Cart')).toBeInTheDocument();
	});

	it('presents the correct number of items for the cart icon if there is a single item type', () => {
		const cartItems : ICartItem[] = [{
				id: "1",
				title: "title 1",
				price: 35,
				description: "desc 1",
				image: "/",
				quantity: 10,
			},];

		render(<RouterProvider router={getRouter(cartItems)} />);

		expect(screen.queryByText('Cart (10)')).toBeInTheDocument();
	});

	it('presents the correct number of items for the cart icon if there are different item types', () => {
		const cartItems = [
			{
				id: "1",
				title: "title 1",
				price: 35,
				description: "desc 1",
				image: "/",
				quantity: 1,
			},
			{
				id: "2",
				title: "title 1",
				price: 35,
				description: "desc 1",
				image: "/",
				quantity: 3,
			},
			{
				id: "3",
				title: "title 1",
				price: 35,
				description: "desc 1",
				image: "/",
				quantity: 6,
			},
		];

		render(<RouterProvider router={getRouter(cartItems)} />);

		expect(screen.queryByText('Cart (10)')).toBeInTheDocument();
	});
});
