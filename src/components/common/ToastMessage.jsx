import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastMessage() {
	const notify = () => toast('success');
	return (
		<div>
			<button onClick={notify} className='bg-blue-500 text-white px-5 py-2 rounded-md ml-3'>Notify!</button>
			<ToastContainer position='bottom-left' pauseOnFocusLoss={false}/>
		</div>
	);
}
