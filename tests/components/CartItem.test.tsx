//
import { describe, it, expect } from 'vitest';
//
import CartItem from '../../src/components/CartItem';
import CartContext from '../../src/contexts/CartContext';
//
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { ICartItem } from '../../src/interfaces';

//
describe('CartItem Component', () => {
	//
	const CartItemWrapper = ({ item } : { item: ICartItem }) => {
		const [cartItems, setCartItems] = useState([item]);

		return (
			<CartContext.Provider value={{ cartItems, setCartItems }}>
				<ul data-testid={'itemlist'}>
					{cartItems.map((item) => (
						<CartItem key={item.id} item={item} />
					))}
				</ul>
			</CartContext.Provider>
		);
	};

	//
	const getRouter = (item : ICartItem) => {
		return createMemoryRouter([
			{
				path: '/',
				element: <CartItemWrapper item={item} />,
			},
		]);
	};

	// Initial Cart item
	const item: ICartItem = {
		id: '1',
		image: '/',
		title: 'Product1',
		quantity: 1,
		price: 100,
		description: "description",
	};

	//
	it('shows the item title as a link to the product page and the product image src is set', () => {
		render(<RouterProvider router={getRouter(item)} />);

		// Title that links to the product page
		const itemTitleLink = screen.getByRole('link', {
			name: `${item.title}`,
		});
		expect(itemTitleLink).toHaveAttribute('href', `/products/${item.id}`);

		// Image
		const productImage = screen.getByRole('img');
		expect(productImage).toHaveAttribute('src', `${item.image}`);
	});

	it('Updates correctly the total price and quantity when adding or removing quantity of the product', async () => {
		//
		render(<RouterProvider router={getRouter(item)} />);

		// Verify Initial Values
		// Quantity
		const quantityInput = screen.getByLabelText(/quantity:/i);
		expect(quantityInput).toHaveValue(item.quantity);

		// Total Price
		screen.getByText(`Total: ${(item.quantity * item.price).toFixed(2)} €`);

		// set up user event
		const user = userEvent.setup();

		// Get the increase and decrease buttons
		const increaseBtn = screen.getByLabelText('increase items');
		const decreaseBtn = screen.getByLabelText('decrease items');

		// Perform increase quantity, click twice increasing to three
		await user.click(increaseBtn);
		await user.click(increaseBtn);

		// Verify the number
		expect(quantityInput).toHaveValue(3);
		screen.getByText(`Total: ${(3 * item.price).toFixed(2)} €`);

		// Perform decrease in quantity to 1
		await user.click(decreaseBtn);
		await user.click(decreaseBtn);

		// Verify number
		expect(quantityInput).toHaveValue(1);
		screen.getByText(`Total: ${(1 * item.price).toFixed(2)} €`);

		// Attempt to lower a value to less than 1.
		await user.click(decreaseBtn);
		await user.click(decreaseBtn);
		await user.click(decreaseBtn);

		// Verify Number
		expect(quantityInput).toHaveValue(1);
		screen.getByText(`Total: ${(1 * item.price).toFixed(2)} €`);

		// Attemp to manually set a value
		await user.clear(quantityInput);
		await user.type(quantityInput, '4');

		// Verify Number
		expect(quantityInput).toHaveValue(4);
		screen.getByText(`Total: ${(4 * item.price).toFixed(2)} €`);

		// Attempt to manually insert an invalid value
		await user.clear(quantityInput);
		await user.type(quantityInput, 'a');

		// Verify input is invalid.
		expect(quantityInput).toBeInvalid();
	});

	it('removes the cart item from the cart when clicking the remove button', async () => {
		render(<RouterProvider router={getRouter(item)} />);

		//
		const user = userEvent.setup();

		//
		const removeBtn = screen.getByRole('button', { name: 'Remove' });
		await user.click(removeBtn);

		//
		const list = screen.getByTestId('itemlist');
		expect(list.children.length).toBe(0);
	});
});
