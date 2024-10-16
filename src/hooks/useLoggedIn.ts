"use client";

import { useEffect, useState } from "react";

export default function useLoggedIn() {
	const [userId, setUserId] = useState("");
	useEffect(() => {
		const token = localStorage.getItem("userId") || "";
		if (token !== null && token !== "") {
			setUserId(token);
		}
	}, []);
	console.log("userId", userId);
	return userId !== null && userId !== "" ? true : false;
}
