"use client";
import React from "react";
import QrReader from "./QRScan";
import Header from "./Header";
const HomeComponent = () => {
	return (
		<div className="max-w-[450px] min-h-screen flex flex-col items-center justify-start mx-auto">
			<Header />
			<div className="w-full flex flex-col space-y-4 p-4 rounded shadow-sm">
				<QrReader />
			</div>
		</div>
	);
};

export default HomeComponent;
