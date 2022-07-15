import { createContext, useState } from "react";

type TransactionProviderProps = {
	children: JSX.Element;
};

const transactionContext = createContext({});

const TransactionsProvider = ({ children }: TransactionProviderProps) => {
	const [transactions, setTransactions] = useState([]);

	const getTransactions = () => {};

	return <transactionContext.Provider value={{ transactions }}>{children}</transactionContext.Provider>;
};

export default TransactionsProvider;
