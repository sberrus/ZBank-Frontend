import axios from "axios";
import { useCallback, useState } from "react";

type fetchedDataType = {
	data: any;
	isLoading: boolean;
	error: boolean;
};
type useFetchProps = (
	url: string
	// options?: any
) => fetchedDataType;

const useFetch: useFetchProps = (url) => {
	// state
	const [fetchedData, setFetchedData] = useState<fetchedDataType>({
		data: [],
		isLoading: false,
		error: false,
	});

	// to cancel the request
	const abortController = new AbortController();

	const fetchData = useCallback(async () => {
		try {
			const response = await axios.get(url, {
				signal: abortController.signal,
			});
			const data = await response.data;
			if (data) {
				setFetchedData({ data: data.results ? data.results : data, isLoading: false, error: false });
			}
		} catch (error) {
			if (axios.isCancel(error)) {
				console.log("fetched aborted");
			} else {
				console.log("Ha ocurrido un error", error);
			}
			setFetchedData({ data: [], isLoading: false, error: true });
		}
	}, [url]);

	const { data, isLoading, error } = fetchedData;
	return { data, isLoading, error };
};

export default useFetch;
