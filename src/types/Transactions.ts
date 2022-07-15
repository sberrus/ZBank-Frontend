export type ClientType = {
	uid: string;
	username: string;
};

export type TransactionType = {
	sender: ClientType;
	receiver: ClientType;
	_id: string;
	concept: string;
	date: string;
	ammount: number;
	__v: number;
};

export type DashboardTableProps = {
	userTransactions: TransactionType[];
};
