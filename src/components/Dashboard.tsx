"use client";
import React, { useEffect, useState } from "react";
import {
	MdOutlinePendingActions,
	MdOutlineQrCodeScanner,
} from "react-icons/md";

import {
	FaFileCircleCheck,
	FaFileCircleXmark,
	FaFileLines,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ADHAR_TYPE } from "@/utils/types";
import Header from "./Header";

const DashboardComponent = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [NotSyncedData, setNotSyncedData] = useState<ADHAR_TYPE[]>([]);
	const [NotSyncCount, setNotSyncCount] = useState(0);

	useEffect(() => {
		const userId = localStorage.getItem("userId") || "";
		if (!userId) {
			router.replace("/");
		}
		const UserName = localStorage.getItem("username") || "";
		setUsername(UserName);
	}, [router]);

	useEffect(() => {
		const dataString = localStorage.getItem("notSyncedData") || "";
		const data: ADHAR_TYPE[] = JSON.parse(dataString);
		setNotSyncCount(data.length);
		setNotSyncedData(data);
	}, []);

	return (
		<div className="max-w-[450px] min-h-screen flex flex-col items-center justify-start mx-auto">
			<div className="w-full px-2">
				<Header username={username} />
				<div className="w-full py-4 flex items-center space-x-4">
					<button
						onClick={() => router.push("/scan")}
						type="button"
						className="w-full flex items-center justify-center shadow-lg active:shadow-none bg-orange-600 px-4 py-2 rounded text-white tracking-widest font-semibold"
					>
						Scan
						<MdOutlineQrCodeScanner className="ml-2 w-6 h-6" />
					</button>
				</div>
				<div className="w-full grid grid-cols-2 gap-4">
					<button
						type="button"
						className="w-full bg-blue-50 relative font-semibold max-w-70 min-h-[100px] border-[1px] rounded-lg p-4 shadow-sm shadow-blue-100 flex flex-col items-start justify-start active:shadow-lg cursor-pointer"
					>
						<FaFileLines className="w-12 h-12 absolute right-2 top-auto text-blue-700" />
						<p className="font-semibold">E KYC</p>
						<p className="font-bold text-4xl ml-2">0</p>
					</button>
					<button
						type="button"
						// onClick={handleSync}
						className="w-full bg-gray-50 relative font-semibold max-w-70 min-h-[100px] border-[1px] rounded-lg p-4 shadow-sm shadow-gray-100 active:shadow-lg cursor-pointer flex flex-col items-start justify-start"
					>
						<MdOutlinePendingActions className="w-12 h-12 absolute right-2 top-auto text-gray-700" />
						<p className="font-semibold">Not Synced</p>
						<p className="font-bold text-4xl ml-2">
							{NotSyncCount}
						</p>
						{/* <p className="text-[11px] absolute bottom-2 right-2">
							Last Synced : 7th Oct, 03:10
						</p> */}
					</button>
					<button
						type="button"
						className="w-full bg-green-50 relative font-semibold max-w-70 min-h-[100px] border-[1px] rounded-lg p-4 shadow-sm shadow-green-100 flex flex-col items-start justify-start active:shadow-lg cursor-pointer"
					>
						<FaFileCircleCheck className="w-12 h-12 absolute right-2 top-auto text-green-700" />
						<p className="font-semibold">Accepted</p>
						<p className="font-bold text-4xl ml-2">0</p>
					</button>
					<button
						type="button"
						className="w-full bg-red-50  relative font-semibold max-w-70 min-h-[100px] border-[1px] rounded-lg p-4 shadow-sm shadow-red-100 flex flex-col items-start justify-start active:shadow-lg cursor-pointer"
					>
						<FaFileCircleXmark className="w-12 h-12 absolute right-2 top-auto text-red-700" />
						<p className="font-semibold">Rejected</p>
						<p className="font-bold text-4xl ml-2">0</p>
					</button>
				</div>

				{NotSyncCount > 0 ? (
					<div className="w-full max-h-[50vh] overflow-scroll mt-4">
						<table className="w-full shadow-lg rounded">
							<tbody className="w-full">
								<tr className="w-[700px] sticky top-0 left-0 grid grid-cols-[1fr,70px,100px,1fr_1fr_1fr] gap-2 bg-blue-600 text-white px-2 py-4 rounded text-center tracking-wider">
									<th className="text-left">Name</th>
									<th>Gender</th>
									<th>DOB</th>
									<th>Address</th>
									<th>Status</th>
									<th>Scaned At</th>
								</tr>
								{NotSyncedData.map((e, index) => (
									<tr
										key={index}
										className="w-[700px] grid grid-cols-[1fr,70px,100px,1fr_1fr_1fr] gap-2 px-2 py-4 rounded odd:bg-slate-100 divide-x-[1px] text-center"
									>
										<td className="truncate text-left">
											{e.name}
										</td>
										<td className="truncate">{e.gender}</td>
										<td className="truncate">
											{new Date(
												e.dob
											).toLocaleDateString()}{" "}
										</td>
										<td className="truncate text-left pl-4">
											{e.address}
										</td>
										<td>
											{e.status === 2
												? "Accepted"
												: e.status === 3
												? "Rejected"
												: "Not Synced"}
										</td>
										<td>{e.timeAt}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default DashboardComponent;
