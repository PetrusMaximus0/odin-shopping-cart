import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AddToCartBtn from '../../src/components/AddToCartBtn';
import userEvent from '@testing-library/user-event';
import CartContext from '../../src/contexts/CartContext';

describe('AddToCartButton Component', () => {
	const buttonText = 'click';

	const BtnComponentWrapper = (
		data = {},
		cartItems = [],
		setCartItems = () => {}
	) => {
		return (
			<CartContext.Provider value={{ cartItems, setCartItems }}>
				<AddToCartBtn data={data} btnText={buttonText} />
			</CartContext.Provider>
		);
	};

	describe('Inputing numbers...', () => {
		it('clicking the plus and minus buttons changes the value on the input. The value does not go below one', async () => {
			//
			render(BtnComponentWrapper());

			// Get input field
			const inputField = screen.getByRole('spinbutton');
			expect(inputField).toBeInTheDocument();
			expect(inputField.value).toBe('1');

			// set up button press
			const user = userEvent.setup();
			const plusBtn = screen.getByLabelText('increase items');
			const minusBtn = screen.getByLabelText('decrease items');

			// Every click on the plus button should increase the input by 1
			await user.click(plusBtn);
			expect(inputField.value).toBe('2');

			// Every click on the minus button should decrease the input by 1
			await user.click(minusBtn);
			expect(inputField.value).toBe('1');

			// The input value doesn't go below 1 when clicking the minus button.
			await user.click(minusBtn);
			expect(inputField.value).toBe('1');

			//
		});

		it('Manually inputing a number works correctly', async () => {
			//
			render(BtnComponentWrapper());

			//
			const inputField = screen.getByRole('spinbutton');
			expect(inputField.value).toBe('1');

			//
			const user = userEvent.setup();

			// Typing a number changes the input correctly
			await user.clear(inputField);
			await user.type(inputField, '4');
			expect(inputField.value).toBe('4');

			// Entering a non number character makes the form invalid.
			await user.clear(inputField);
			await user.type(inputField, 'c');
			expect(inputField).toBeInvalid();

			//
		});
	});

	describe('Submitting the form...', () => {
		it('the button text changes on submit and the item is added to cart', async () => {
			const data = { id: 1 };
			let cartItems = [{ id: 2, quantity: 1 }];
			const setCartItems = (newItems) => {
				cartItems = [...newItems];
			};

			//
			render(BtnComponentWrapper(data, cartItems, setCartItems));

			// cartItems has only one item
			expect(cartItems.length === 1).toBeTruthy();

			// Add the item to the cart
			const submitButton = screen.getByText(/click/);
			const user = userEvent.setup();
			await user.click(submitButton);

			await waitFor(async () => {
				expect(submitButton).toHaveTextContent('Item Added');
			});

			await waitFor(
				async () => {
					expect(submitButton).toHaveTextContent(buttonText);
				},
				{ timeout: 4000 }
			);

			// The item was added to cart items
			expect(
				cartItems.findIndex((item) => item.id === data.id) !== -1
			).toBeTruthy();

			// There should now be two items in the cart
			expect(cartItems.length === 2).toBeTruthy();
		});

		it('adds correctly to the quantity of an item already in the cart', async () => {
			const data = { id: 1 };
			let cartItems = [
				{ id: 1, quantity: 1 },
				{ id: 2, quantity: 5 },
			];
			const setCartItems = (newItems) => {
				cartItems = [...newItems];
			};

			//
			render(BtnComponentWrapper(data, cartItems, setCartItems));

			// Add an item to the cart
			const user = userEvent.setup();
			const submitButton = screen.getByText(/click/);
			await user.click(submitButton);

			// The cart should have the same number of unique items as the start
			expect(cartItems.length === 2).toBeTruthy();

			// The added item should have a quantity of 2
			const index = cartItems.findIndex((item) => item.id === data.id);
			expect(index !== -1).toBeTruthy();
			expect(cartItems[index].quantity === 2).toBeTruthy();
		});

		it('does not submit an invalid form.', async () => {
			const data = { id: 1123213 };
			let cartItems = [];
			const setCartItems = (newItems) => {
				cartItems = newItems;
			};

			//
			render(BtnComponentWrapper(data, cartItems, setCartItems));

			//
			const inputField = screen.getByRole('spinbutton');

			//
			const user = userEvent.setup();

			//
			await user.clear(inputField);
			await user.type(inputField, 'a');
			expect(inputField).toBeInvalid();

			//
			const submitButton = screen.getByText(/click/);
			await user.click(submitButton);

			// Nothing was added to cartItems.
			expect(cartItems.length === 0).toBeTruthy();
		});
	});
});
