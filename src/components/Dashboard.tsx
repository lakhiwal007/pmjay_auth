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
		<div className="max-w-[450px] min-h-screen flex flex-col items-center justify-center mx-auto">
			<div className="w-full p-2 grid grid-cols-2 gap-4">
				<div className="w-full bg-blue-50 relative font-semibold max-w-70 min-h-[120px] border-[1px] rounded-lg p-4 shadow-sm shadow-blue-100">
					<FaFileLines className="w-10 h-10 absolute right-2 top-auto text-blue-700" />
					<p>E KYC</p>
					<p className="font-bold text-3xl">0</p>
				</div>
				<div className="w-full bg-gray-50 relative font-semibold max-w-70 min-h-[120px] border-[1px] rounded-lg p-4 shadow-sm shadow-gray-100">
					<MdOutlinePendingActions className="w-10 h-10 absolute right-2 top-auto text-gray-700" />
					<p>Not Synced</p>
					<p className="font-bold text-3xl">0</p>
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
			<div className="w-full px-2 py-4">
				<button
					onClick={() => router.push("/scan")}
					type="button"
					className="w-full shadow-lg active:shadow-none bg-orange-600 px-4 py-2 rounded text-white tracking-wider font-semibold"
				>
					Scan
				</button>
			</div>
		</div>
	);
};

export default DashboardComponent;
