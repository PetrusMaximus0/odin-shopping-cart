import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces';

const useFetchProductDetail = (id: string) => {
	const [product, setProduct] = useState<null | IProduct>(null);
	const [error, setError] = useState<null|Error>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async (id: string) => {
			setLoading(true);
			try {
				const url = 'https://fakestoreapi.com/products/' + id;

				const response = await fetch(url, { mode: 'cors', method: 'GET' });

				if (response.status >= 400) {
					throw new Error('Server Error');
				} else if (!response.ok) {
					throw new Error(response.statusText);
				}

				const result = await response.json();

				setProduct(result);
			} catch (error) {
				setError(error as Error);
			}
			setLoading(false);
		};

		//
		fetchData(id);
	}, [id]);

	return { product, loading, error };
};

export default useFetchProductDetail;
