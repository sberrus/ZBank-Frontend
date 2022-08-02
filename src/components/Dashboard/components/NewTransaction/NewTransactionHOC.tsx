//partials
import CashOut from "./CashOut";
import Transfer from "./Transfer";

const NewTransaction = ({
	btnTitle,
	cashout,
	setRender,
	render,
	receiverID,
}) => {
	return cashout ? (
		<CashOut setRender={setRender} render={render} />
	) : (
		<Transfer
			btnTitle={btnTitle}
			setRender={setRender}
			render={render}
			receiverID={receiverID}
		/>
	);
};

export default NewTransaction;
