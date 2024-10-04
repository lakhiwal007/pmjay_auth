"use client";
import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import {
	FaFileCircleCheck,
	FaFileCircleXmark,
	FaFileLines,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";

const DashboardComponent = () => {
	const router = useRouter();
	return (
		<div className="max-w-[450px] min-h-screen flex flex-col lg:items-center lg:justify-center mx-auto">
			<div className="w-full p-2 grid grid-cols-2 gap-4">
				<div className="w-full relative font-semibold max-w-70 max-h-60 border-2 rounded p-4 shadow-md">
					<FaFileLines className="w-8 h-8 absolute right-2 top-auto text-blue-700" />
					<p>E KYC</p>
					<p>0</p>
				</div>
				<div className="w-full relative font-semibold max-w-70 max-h-60 border-2 rounded p-4 shadow-md">
					<MdOutlinePendingActions className="w-8 h-8 absolute right-2 top-auto text-gray-700" />
					<p>Not Synced</p>
					<p>0</p>
				</div>
				<div className="w-full relative font-semibold max-w-70 max-h-60 border-2 rounded p-4 shadow-md">
					<FaFileCircleCheck className="w-8 h-8 absolute right-2 top-auto text-green-700" />
					<p>Accepted</p>
					<p>0</p>
				</div>
				<div className="w-full relative font-semibold max-w-70 max-h-60 border-2 rounded p-4 shadow-md">
					<FaFileCircleXmark className="w-8 h-8 absolute right-2 top-auto text-red-700" />
					<p>Rejected</p>
					<p>0</p>
				</div>
			</div>
			<div className="w-full p-4">
				<button
					onClick={() => router.push("/scan")}
					type="button"
					className="w-full shadow-lg active:shadow-none bg-orange-700 px-4 py-2 rounded text-white tracking-wider font-semibold"
				>
					Scan
				</button>
			</div>
		</div>
	);
};

export default DashboardComponent;
