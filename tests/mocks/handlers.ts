import { HttpResponse, http } from 'msw';

export const handlers = [
	// Intercept GET request for apiurl/products
	http.get('https://fakestoreapi.com/products', () => {
		// Respond to the request with this JSON response:
		return HttpResponse.error();
	}),

	// Intercept GET request for apiurl/products/id
	http.get('https://fakestoreapi.com/products/:id', () => {
		return HttpResponse.error();
	}),
];
