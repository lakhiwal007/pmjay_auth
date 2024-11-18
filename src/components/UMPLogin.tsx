import React from "react";
import { MdRotateRight } from "react-icons/md";

const UMPLogin = () => {
	return (
		<div>
			<input type="text" placeholder="Enter the text" />
			<p>captcha image</p>
			<button type="button">
				<MdRotateRight />
			</button>
		</div>
	);
};

export default UMPLogin;
