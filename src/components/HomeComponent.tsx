"use client";
import React, { useEffect, useState } from "react";
import QrReader from "./QRScan";
import Header from "./Header";
import { useRouter } from "next/navigation";
const HomeComponent = () => {
	const router = useRouter();

	const [username, setUsername] = useState("");
	// useEffect(() => {
	// 	const userId = localStorage.getItem("userId") || "";
	// 	if (!userId) {
	// 		router.replace("/");
	// 	}
	// 	const UserName = localStorage.getItem("username") || "";
	// 	setUsername(UserName);
	// }, [router]);

	return (
		<div className="max-w-[450px] min-h-screen flex flex-col items-center justify-start mx-auto">
			<Header username={username} />
			<div className="w-full flex flex-col space-y-4 p-4 rounded shadow-sm">
				<QrReader />
			</div>
		</div>
	);
};

export default HomeComponent;
