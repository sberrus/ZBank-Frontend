import { useEffect } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

const Modal = () => {
	useEffect(() => {
		const modal = document.getElementById("myModal");
		console.log(modal);
		const modalController = new bootstrap.Modal(modal, {});
		modalController.show();
	}, []);

	return (
		<div>
			<div className="modal" tabIndex="-1" id="myModal">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-dark">
						<div className="modal-header">
							<h5 className="modal-title">Modal title</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<p>Modal body text goes here.</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button type="button" className="btn btn-primary">
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
