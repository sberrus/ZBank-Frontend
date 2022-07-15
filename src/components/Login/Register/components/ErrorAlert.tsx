import { ErrorAlertProps } from "../../../../types/Utils";

const ErrorAlert = ({ msg, type }: ErrorAlertProps) => {
	return (
		<div className={`alert alert-${type}`} role="alert">
			{msg}
		</div>
	);
};

export default ErrorAlert;
