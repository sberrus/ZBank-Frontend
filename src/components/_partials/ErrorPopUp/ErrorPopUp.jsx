import React from "react";

const ErrorPopUp = ({ msg }) => {
	return (
		<div class="position-fixed bottom-0 end-0 col-12 bg-dark">
			<div
				id="liveToast"
				class="toast bg-dark"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				{
					<div class={`toast-header bg-${"danger"} text-dark`}>
						<strong class="me-auto">{msg.header}</strong>
					</div>
				}
				<div class="toast-body">{msg.body}</div>
			</div>
		</div>
	);
};

export default ErrorPopUp;
