"use client";
import React, { useEffect, useState } from "react";
import {
	MdArrowDropDown,
	MdOutlinePendingActions,
	MdPerson,
} from "react-icons/md";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	FaFileCircleCheck,
	FaFileCircleXmark,
	FaFileLines,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import LOGO from "@/public/icons/pmjay_logo-512.png";
import Image from "next/image";
type UserType = {
	id: number;
	name: string;
	address: string;
	gender: string;
	dob: string;
};

const checkOnlineStatus = async () => {
	try {
		const online = await fetch("/api/user");
		return online.status >= 200 && online.status < 300; // either true or false
	} catch (err) {
		return false;
	}
};

const DashboardComponent = () => {
	const router = useRouter();
	const [NotSyncedData, setNotSyncedData] = useState<UserType[]>([]);
	const [NotSyncCount, setNotSyncCount] = useState(0);
	const [NetworkStatus, setNetworkStatus] = useState("Offline");

	const handleSync = async () => {
		const result = await checkOnlineStatus();
		setNetworkStatus(result ? "Online" : "Offline");
		const response = await fetch("/api/user", {
			method: "GET",
		});
		if (response.ok) {
			const res = await response.json();
			setNotSyncedData(res);
			setNotSyncCount(res.length);
		}
	};

	useEffect(() => {
		handleSync();
	}, []);

	useEffect(() => {
		setInterval(async () => {
			const result = await checkOnlineStatus();
			setNetworkStatus(result ? "Online" : "Offline");
		}, 30000);
	}, []);

	return (
		<div className="max-w-[450px] min-h-screen flex flex-col items-center justify-start mx-auto">
			{/* <p
				className={`w-full px-4 py-2 font-semibold rounded mb-2 text-white tracking-widest ${
					NetworkStatus === "Online" ? "bg-green-700" : "bg-red-700"
				}`}
			>
				You are {NetworkStatus}
			</p> */}
			<div className="w-full flex shadow-sm rounded px-2 py-4 justify-between items-center">
				<Image src={LOGO} width={100} height={100} alt="logo" />
				<div className="relative flex items-center space-x-2">
					<p className="font-bold truncate max-w-24">Username</p>

					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className="flex items-center">
								<MdPerson className="w-8 h-8" />
								<MdArrowDropDown />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="w-full px-2">
				<div className="w-full py-4 flex items-center space-x-4">
					<button
						onClick={() => router.push("/scan")}
						type="button"
						className="w-full shadow-lg active:shadow-none bg-orange-600 px-4 py-2 rounded text-white tracking-wider font-semibold"
					>
						Scan
					</button>
					{/* <button type="button">
					<MdOutlineSync className="p-2 w-10 h-10 text-white bg-teal-700 rounded-full shadow-md active:shadow-none" />
				</button> */}
				</div>
				<div className="w-full grid grid-cols-2 gap-4">
					<div className="w-full bg-blue-50 relative font-semibold max-w-70 min-h-[120px] border-[1px] rounded-lg p-4 shadow-sm shadow-blue-100">
						<FaFileLines className="w-10 h-10 absolute right-2 top-auto text-blue-700" />
						<p>E KYC</p>
						<p className="font-bold text-3xl">0</p>
					</div>
					<div
						onClick={handleSync}
						className="w-full bg-gray-50 relative font-semibold max-w-70 min-h-[120px] border-[1px] rounded-lg p-4 shadow-sm shadow-gray-100 active:shadow-lg cursor-pointer"
					>
						<MdOutlinePendingActions className="w-10 h-10 absolute right-2 top-auto text-gray-700" />
						<p>Not Synced</p>
						<p className="font-bold text-3xl">{NotSyncCount}</p>
						<p className="text-[11px] absolute bottom-2 right-2">
							Last Synced : 7th Oct, 03:10
						</p>
					</div>
					<div className="w-full bg-green-50 relative font-semibold max-w-70 min-h-[120px] border-[1px] rounded-lg p-4 shadow-sm shadow-green-100">
						<FaFileCircleCheck className="w-10 h-10 absolute right-2 top-auto text-green-700" />
						<p>Accepted</p>
						<p className="font-bold text-3xl">0</p>
					</div>
					<div className="w-full bg-red-50  relative font-semibold max-w-70 min-h-[120px] border-[1px] rounded-lg p-4 shadow-sm shadow-red-100">
						<FaFileCircleXmark className="w-10 h-10 absolute right-2 top-auto text-red-700" />
						<p>Rejected</p>
						<p className="font-bold text-3xl">0</p>
					</div>
				</div>

				{NotSyncCount > 0 ? (
					<div className="w-full mt-2 shadow-sm border-[1px] rounded">
						<div className="w-full grid grid-cols-[1fr,60px,1fr,1fr] font-semibold tracking-wide text-left gap-2 bg-blue-600 text-white p-2 rounded">
							<p>Name</p>
							<p>Gender</p>
							<p>DOB</p>
							<p>Address</p>
						</div>
						{NotSyncedData.map((e) => (
							<div
								key={e.id}
								className="w-full grid grid-cols-[1fr,60px,1fr,1fr] gap-2 p-2 rounded odd:bg-slate-100"
							>
								<p className="truncate">{e.name}</p>
								<p className="truncate">{e.gender}</p>
								<p className="truncate">{e.dob} </p>
								<p className="truncate">{e.address}</p>
							</div>
						))}
					</div>
				) : (
					<div className="w-full mt-4">
						<p className="text-left font-bold">Not Synced Data</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardComponent;
