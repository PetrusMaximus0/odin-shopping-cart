import { useEffect, useState } from 'react';

const useFetchProducts = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const url = 'https://fakestoreapi.com/products?limit=20';

				const response = await fetch(url, { mode: 'cors', method: 'GET' });

				if (response.status >= 400) {
					throw new Error('Server Error');
				} else if (!response.ok) {
					throw new Error(response.statusText);
				}

				const result = await response.json();

				setData(result);
			} catch (error) {
				setError(error);
			}
			setLoading(false);
		};

		//
		fetchData();
	}, []);

	return { products: data, loading, error };
};

export default useFetchProducts;
