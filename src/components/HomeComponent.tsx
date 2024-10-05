"use client";
import React from "react";

import QrReader from "./QRScan";
const HomeComponent = () => {
	return (
		<div className="max-w-[450px] min-h-screen flex items-center justify-center mx-auto">
			<div className="w-full flex flex-col space-y-4 p-4 border-[1px] rounded shadow-lg ">
				<QrReader />
			</div>
		</div>
	);
};

export default HomeComponent;
