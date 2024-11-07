"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	MdOutlinePendingActions,
	MdOutlineQrCodeScanner,
	MdSync,
	MdUploadFile,
} from "react-icons/md";

import {
	FaFileCircleCheck,
	FaFileCircleXmark,
	FaFileLines,
} from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import {
	FamilyMemberNotSynced,
	FamilyMemberNotSyncedData,
} from "@/utils/types";
import Header from "./Header";
import Card from "./Card";
import Paginator from "@/utils/paginator";
import { csvToJson } from "@/utils/csvToJSON";
import Loader from "./Loader";
import toast from "react-hot-toast";

const DashboardComponent = () => {
	const router = useRouter();
	const params = useSearchParams();
	const cuurIndex = params?.get("page") || 1;

	const [username, setUsername] = useState("");
	const [isUploading, setisUploading] = useState(false);
	const [NotSyncedData, setNotSyncedData] = useState<
		FamilyMemberNotSyncedData[]
	>([]);
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
			const data: FamilyMemberNotSyncedData[] = JSON.parse(dataString);
			setNotSyncCount(data.length);
			const InitialIndex = (CurrPageIndex - 1) * NUM_ROWS;
			setNotSyncedData(data.slice(InitialIndex, InitialIndex + NUM_ROWS));
		}
	}, [CurrPageIndex]);

	const onPageHandle = (pageNum: number) => {
		setCurrPageIndex(pageNum + 1);
	};
	let fileRef = useRef<HTMLInputElement | null>(null);

	const UploadFile = () => {
		fileRef.current?.click();
	};

	const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
		setisUploading(true);
		const reader = new FileReader();
		reader.onload = () => {
			const res = csvToJson(String(reader.result));
			if (res.length > 0) {
				localStorage.setItem("data", JSON.stringify(res));
				toast.success("Data uploaded successfully.");
			} else {
				toast.error("Upload Valid CSV File.");
			}
			setisUploading(false);
		};
		if (e.target.files) {
			// start reading the file. When it is done, calls the onload event defined above.
			reader.readAsText(e.target?.files[0]);
		}
	};

	return (
		<div className="max-w-[450px] min-h-screen flex flex-col items-center justify-start mx-auto">
			<div className="w-full px-2">
				<Header username={username} />
				<div className="w-full py-4 flex flex-col items-center">
					<button
						onClick={() => router.push("/scan")}
						type="button"
						className="w-full flex items-center justify-center shadow-lg active:shadow-none bg-orange-600 px-4 py-2 rounded text-white tracking-widest font-semibold"
					>
						Scan
						<MdOutlineQrCodeScanner className="ml-2 w-6 h-6" />
					</button>
					<div className="w-full flex items-center space-x-4 mt-4">
						<button
							disabled={isUploading}
							onClick={() => UploadFile()}
							type="button"
							className="w-full flex items-center justify-center shadow-lg active:shadow-none bg-blue-600 px-4 py-2 rounded text-white tracking-widest font-semibold"
						>
							Upload CSV
							<MdUploadFile className="ml-2 w-6 h-6" />
							<input
								type="file"
								name="csvFile"
								ref={fileRef}
								onChange={onFileChangeCapture}
								id="csvFile"
								accept=".csv"
								hidden
							/>
						</button>
						<button
							// onClick={() => router.push("")}
							type="button"
							className="w-full relative flex items-center justify-center shadow-lg active:shadow-none bg-green-700 px-4 py-2 rounded text-white tracking-widest font-semibold"
						>
							Sync Data
							<MdSync className="ml-2 w-6 h-6" />
						</button>
					</div>
				</div>
				<div className="w-full grid grid-cols-2 gap-4">
					<Card
						Title={"Delivered"}
						Count={0}
						Icon={FaFileLines}
						classNameButton="shadow-teal-100 bg-teal-100"
						classNameIcon="text-teal-700"
					/>

					<Card
						Title={"Not Synced"}
						Count={NotSyncCount}
						Icon={MdOutlinePendingActions}
						classNameButton="shadow-gray-100 bg-gray-100"
						classNameIcon="text-gray-700"
					/>
					{/* <Card
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
					/> */}
				</div>

				{NotSyncCount > 0 ? (
					<div className="w-full sticky top-0 mt-4">
						<div className="w-full max-h-screen overflow-x-scroll">
							<table className="w-full shadow-lg rounded">
								<tbody className="w-full">
									<tr className="w-[1100px] sticky top-0 left-0 grid grid-cols-8 gap-2 bg-blue-600 text-white px-2 py-4 rounded text-center tracking-wider">
										<th className="text-left">Family ID</th>

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
											className="w-[1100px] grid grid-cols-8 gap-2 px-2 py-4 rounded odd:bg-slate-100 divide-x-[1px] text-center"
										>
											<td className="truncate text-left pl-2">
												{e.family_id}
											</td>
											<td className="truncate text-left pl-2">
												{e.ben_id.length > 10
													? `${e.ben_id.substring(
															0,
															3
													  )}...${e.ben_id.substring(
															16
													  )}`
													: e.ben_id}
											</td>
											<td className="truncate text-left pl-2">
												{e.card_name}
											</td>
											<td className="truncate">
												{e.card_gender}
											</td>
											<td className="truncate">
												{new Date(
													e.card_yob
												).toLocaleDateString()}{" "}
											</td>
											<td className="truncate text-left pl-4">
												{e.card_address}
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
						<div className="w-full mb-8 mt-4">
							<Paginator
								currentPage={CurrPageIndex}
								totalPages={Math.ceil(NotSyncCount / NUM_ROWS)}
								onPageChange={(pageNumber) =>
									onPageHandle(pageNumber)
								}
								showPreviousNext
							/>
						</div>
					</div>
				) : (
					<p className="w-full p-4 font-semibold tracking-wider">
						No Data
					</p>
				)}
			</div>
			{isUploading && <Loader title="Uploading Data" />}
		</div>
	);
};

export default DashboardComponent;
