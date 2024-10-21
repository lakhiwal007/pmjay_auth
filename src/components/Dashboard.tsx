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
import { useRouter, useSearchParams } from "next/navigation";
import { FamilyMemberNotSynced } from "@/utils/types";
import Header from "./Header";
import Card from "./Card";
import Paginator from "@/utils/paginator";

const DashboardComponent = () => {
	const router = useRouter();
	const params = useSearchParams();
	const cuurIndex = params?.get("page") || 1;

	const [username, setUsername] = useState("");
	const [NotSyncedData, setNotSyncedData] = useState<FamilyMemberNotSynced[]>(
		[]
	);
	const [NotSyncCount, setNotSyncCount] = useState(0);
	const [CurrPageIndex, setCurrPageIndex] = useState(Number(cuurIndex));
	const NUM_ROWS = 5;

	useEffect(() => {
		setCurrPageIndex(Number(cuurIndex));
	}, [cuurIndex]);

	useEffect(() => {
		const userId = localStorage.getItem("userId") || "";
		if (!userId) {
			router.replace("/");
		}
		const UserName = localStorage.getItem("username") || "";
		setUsername(UserName);
	}, [router]);

	useEffect(() => {
		const dataString = localStorage.getItem("notSyncedFamilyData") || "";
		if (dataString !== "") {
			const data: FamilyMemberNotSynced[] = JSON.parse(dataString);
			setNotSyncCount(data.length);
			const InitialIndex = (CurrPageIndex - 1) * NUM_ROWS;
			setNotSyncedData(data.slice(InitialIndex, InitialIndex + NUM_ROWS));
		}
	}, [CurrPageIndex]);

	const onPageHandle = (pageNum: number) => {
		setCurrPageIndex(pageNum + 1);
	};

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
					<Card
						Title={"E KYC"}
						Count={0}
						Icon={FaFileLines}
						classNameButton="shadow-blue-100 bg-blue-100"
						classNameIcon="text-blue-700"
					/>

					<Card
						Title={"Not Synced"}
						Count={NotSyncCount}
						Icon={MdOutlinePendingActions}
						classNameButton="shadow-gray-100 bg-gray-100"
						classNameIcon="text-gray-700"
					/>
					<Card
						Title={"Accepted"}
						Count={0}
						Icon={FaFileCircleCheck}
						classNameButton="shadow-green-100 bg-green-100"
						classNameIcon="text-green-700"
					/>
					<Card
						Title={"Rejected"}
						Count={0}
						Icon={FaFileCircleXmark}
						classNameButton="shadow-red-100 bg-red-100"
						classNameIcon="text-red-700"
					/>
				</div>

				{NotSyncCount > 0 ? (
					<div className="w-full max-h-screen overflow-x-scroll mt-4">
						<table className="w-full shadow-lg rounded">
							<tbody className="w-full">
								<tr className="w-[1100px] sticky top-0 left-0 grid grid-cols-9 gap-2 bg-blue-600 text-white px-2 py-4 rounded text-center tracking-wider">
									<th className="text-left">Family ID</th>
									<th></th>
									<th>Member ID</th>
									<th>Name</th>
									<th>Gender</th>
									<th>DOB</th>
									<th>Address</th>
									<th>Status</th>
									<th>Delivered At</th>
								</tr>
								{NotSyncedData.map((e, index) => (
									<tr
										key={index}
										className="w-[1100px] grid grid-cols-9 gap-2 px-2 py-4 rounded odd:bg-slate-100 divide-x-[1px] text-center"
									>
										<td className="truncate text-left pl-2 col-span-2">
											{e.familyId}
										</td>
										<td className="truncate text-left pl-2">
											{`${e.memberId.substring(
												0,
												3
											)}...${e.memberId.substring(16)}`}
										</td>
										<td className="truncate text-left pl-2">
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
										<td>
											{new Date(
												e.deliveredAt
											).toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					"No data"
				)}
				<div className="w-full mb-8 mt-4">
					<Paginator
						currentPage={CurrPageIndex}
						totalPages={Math.ceil(NotSyncCount / NUM_ROWS)}
						onPageChange={(pageNumber) => onPageHandle(pageNumber)}
						showPreviousNext
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardComponent;
