export type ClientType = {
	uid: string;
	username: string;
};

export type TransactionType = {
	sender: ClientType;
	receiver: ClientType;
	concept: string;
	date: string;
	ammount: number;
	_id: string;
	__v: number;
};

export type DashboardTableProps = {
	userTransactions: TransactionType[];
};
