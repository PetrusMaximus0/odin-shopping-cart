import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import AddToCartBtn from '../../src/components/AddToCartBtn';
import userEvent from '@testing-library/user-event';

describe('AddToCartButton Component', () => {
	const buttonText = 'click';

	describe('Inputing numbers...', () => {
		it('clicking the plus and minus buttons changes the value on the input. The value does not go below one', async () => {
			//
			render(
				<AddToCartBtn handleFormSubmit={() => {}} btnText={buttonText} />
			);

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
			render(
				<AddToCartBtn handleFormSubmit={() => {}} btnText={buttonText} />
			);

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
			await user.type(inputField, 'a');
			expect(inputField).toBeInvalid();

			//
		});
	});

	describe('Submitting the form', () => {
		it('The happy path submits correctly, the button text changes on submit', async () => {
			//
			const submissionCallback = vi.fn();
			//
			render(
				<AddToCartBtn
					handleFormSubmit={submissionCallback}
					btnText={buttonText}
				/>
			);

			//
			const inputField = screen.getByRole('spinbutton');
			expect(inputField.value).toBe('1');

			//
			const submitButton = screen.getByText(/click/);

			//
			const user = userEvent.setup();
			await user.click(submitButton);
			await waitFor(async () => {
				expect(submitButton).toHaveTextContent('Item Added');
			});
			expect(submissionCallback).toBeCalled();
		});

		it('Attempting to submit an invalid form does nothing.', async () => {
			//
			const submissionCallback = vi.fn();

			//
			render(
				<AddToCartBtn
					handleFormSubmit={submissionCallback}
					btnText={buttonText}
				/>
			);

			//
			const inputField = screen.getByRole('spinbutton');
			expect(inputField.value).toBe('1');

			//
			const user = userEvent.setup();

			//
			await user.clear(inputField);
			await user.type(inputField, 'a');
			expect(inputField).toBeInvalid();

			//
			const submitButton = screen.getByText(/click/);
			await user.click(submitButton);

			//
			expect(submissionCallback).not.toBeCalled();
		});
	});
});
