import { useEffect, useState } from 'react';

const useFetchProductDetail = (id) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async (id) => {
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

				setData(result);
			} catch (error) {
				setError(error);
			}
			setLoading(false);
		};

		//
		fetchData(id);
	}, [id]);

	return { product: data, loading, error };
};

export default useFetchProductDetail;
