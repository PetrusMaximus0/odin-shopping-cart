import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces';

const useFetchProducts = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [error, setError] = useState<null|Error>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const url = 'https://fakestoreapi.com/products/?limit=20';

				const response = await fetch(url, { mode: 'cors', method: 'GET' });

				if (response.status >= 400) {
					setError(new Error('Server Error'));
					return;
				} else if (!response.ok) {
					setError(new Error(response.statusText));
					return;
				}
				const result = await response.json();
				setProducts(result);
			} catch (error) {
				setError(error instanceof Error ? error : new Error(`Error: ${error}`));
			}
			setLoading(false);
		};

		(async ()=> await fetchData())();

	}, []);

	return { products, loading, error };
};

export default useFetchProducts;
