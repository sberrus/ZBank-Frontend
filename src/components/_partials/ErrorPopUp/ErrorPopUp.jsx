import React from "react";

const ErrorPopUp = ({ msg }) => {
	return (
		<div className="position-fixed bottom-0 end-0 col-12 bg-dark">
			<div
				id="liveToast"
				className="toast bg-dark"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				{
					<div className={`toast-header bg-${"danger"} text-dark`}>
						<strong className="me-auto">{msg.header}</strong>
					</div>
				}
				<div className="toast-body">{msg.body}</div>
			</div>
		</div>
	);
};

export default ErrorPopUp;
