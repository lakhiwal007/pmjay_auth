"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	MdOutlinePendingActions,
	MdOutlineQrCodeScanner,
	MdSync,
	MdUploadFile,
} from "react-icons/md";

import { FaFileLines } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { FamilyMemberNotSyncedData } from "@/utils/types";
import Header from "./Header";
import Card from "./Card";
import Paginator from "@/utils/paginator";
import { csvToJson } from "@/utils/csvToJSON";
import Loader from "./Loader";
import toast from "react-hot-toast";
import LoginModal from "./LoginModal";
import { useNetworkConnectivity } from "@/hooks/useNetworkConnectivity";
import { CardDeliveryAPI } from "@/utils/BIS_APIs/genearteToken";

const DashboardComponent = () => {
	const router = useRouter();
	const params = useSearchParams();
	const cuurIndex = params?.get("page") || 1;

	const [username, setUsername] = useState("");
	const [isUploading, setisUploading] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [NotSyncedData, setNotSyncedData] = useState<
		FamilyMemberNotSyncedData[]
	>([]);
	const [cardSelected, setcardSelected] = useState("DELEVERED");
	const [NotSyncCount, setNotSyncCount] = useState(0);
	const [DeleveredCount, setDeleveredCount] = useState(0);
	const [CurrPageIndex, setCurrPageIndex] = useState(Number(cuurIndex));
	const [isLoginModal, setisLoginModal] = useState(false);
	const NUM_ROWS = 5;

	const [isLoggedIn, setisLoggedIn] = useState(false);
	const isConnected = useNetworkConnectivity({});

	useEffect(() => {
		setCurrPageIndex(Number(cuurIndex));
	}, [cuurIndex]);

	useEffect(() => {
		const UserName = localStorage.getItem("username") || "";
		setUsername(UserName);
	}, [router]);

	useEffect(() => {
		const deliverCount = Number(localStorage.getItem("delvrCount")) || 0;
		const synCount = Number(localStorage.getItem("synCount")) || 0;
		if (deliverCount) {
			setDeleveredCount(deliverCount);
		} else {
			localStorage.setItem("delvrCount", "0");
		}
		if (synCount) {
			setNotSyncCount(synCount);
		} else {
			localStorage.setItem("synCount", "0");
		}
	}, []);

	useEffect(() => {
		const dataString = localStorage.getItem("notSyncedFamilyData") || "";
		const dataUpdated = localStorage.getItem("updatedCards") || "";
		const DeleveredCount = Number(localStorage.getItem("delvrCount")) || 0;
		const SyncedCount = Number(localStorage.getItem("synCount")) || 0;
		if (dataString !== "" && cardSelected === "DELEVERED") {
			const data: FamilyMemberNotSyncedData[] = JSON.parse(dataString);
			setDeleveredCount(data.length);
			localStorage.setItem("delvrCount", String(data.length));
			const InitialIndex = (CurrPageIndex - 1) * NUM_ROWS;
			setNotSyncedData(data.slice(InitialIndex, InitialIndex + NUM_ROWS));
		}

		if (dataUpdated !== "" && cardSelected === "SYNCED") {
			const data: FamilyMemberNotSyncedData[] = JSON.parse(dataUpdated);
			setNotSyncCount(data.length);
			localStorage.setItem("synCount", String(data.length));
			const InitialIndex = (CurrPageIndex - 1) * NUM_ROWS;
			setNotSyncedData(data.slice(InitialIndex, InitialIndex + NUM_ROWS));
		}
	}, [CurrPageIndex, cardSelected]);

	const onPageHandle = (pageNum: number) => {
		setCurrPageIndex(pageNum + 1);
	};
	let fileRef = useRef<HTMLInputElement | null>(null);

	const UploadFile = () => {
		fileRef.current?.click();
	};

	const onFileChangeCapture = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setisUploading(true);

		if (e.target.files) {
			// start reading the file. When it is done, calls the onload event defined above.
			const file = e.target?.files[0];
			const data = await csvToJson(file);
			if (data.length > 0) {
				localStorage.setItem("data", JSON.stringify(data));
				toast.success("Data uploaded successfully.");
			} else {
				toast.error("Upload Valid CSV File.");
			}
			setisUploading(false);
		}
	};

	useEffect(() => {
		const CardString = localStorage.getItem("notSyncedFamilyData") || "";
		if (isLoggedIn && isConnected && CardString !== "") {
			const authToken = localStorage.getItem("authToken") || "";
			const CardsList = JSON.parse(CardString) || [];
			const syncCards = async () => {
				try {
					setisLoading(true);

					// Process all card delivery operations concurrently
					const updatedCards = await Promise.all(
						CardsList.map(async (card: any) => {
							const cardResponse = await CardDeliveryAPI(
								authToken,
								[card.card_no],
								card.state_cd
							);
							const cardRes = await cardResponse.json();

							if (cardResponse.ok) {
								card.status =
									cardRes.success === "Success" ? 2 : 3;
							} else {
								card.status = 1;
							}
							return card;
						})
					);
					const synCount =
						Number(localStorage.getItem("synCount")) || 0;
					setNotSyncCount(synCount + updatedCards.length);
					setNotSyncedData((prev) => [...updatedCards, prev]);
					localStorage.setItem("notSyncedFamilyData", "");
					localStorage.setItem(
						"synCount",
						String(synCount + updatedCards.length)
					);
					localStorage.setItem(
						"updatedCards",
						JSON.stringify(updatedCards)
					);

					// You can use updatedCards for further processing if needed
					toast.success("Cards synced successfully!");
				} catch (error) {
					toast.error("Something went wrong. Try again.");
				} finally {
					setisLoading(false);
				}
			};
			syncCards();
		}
	}, [isConnected, isLoggedIn]);

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
							onClick={() => setisLoginModal(true)}
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
						Count={DeleveredCount}
						Icon={FaFileLines}
						classNameButton="shadow-teal-100 bg-teal-100"
						classNameIcon="text-teal-700"
						onClickFn={() => setcardSelected("DELEVERED")}
					/>

					<Card
						Title={"Synced"}
						Count={NotSyncCount}
						Icon={MdOutlinePendingActions}
						classNameButton="shadow-gray-100 bg-gray-100"
						classNameIcon="text-gray-700"
						onClickFn={() => setcardSelected("SYNCED")}
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

				{DeleveredCount > 0 ? (
					<div className="w-full sticky top-0 mt-4">
						<div className="w-full max-h-screen overflow-x-scroll">
							<table className="w-full shadow-lg rounded">
								<tbody className="w-full">
									<tr className="w-[1100px] sticky top-0 left-0 grid grid-cols-8 gap-2 bg-blue-600 text-white px-2 py-4 rounded text-center tracking-wider">
										<th className="text-left">Family ID</th>

										<th>Member ID</th>
										<th>Name</th>
										<th>Gender</th>
										<th>YOB</th>
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
												{String(e.family_id)}
											</td>
											<td className="truncate text-left pl-2">
												{String(e.ben_id).length > 10
													? `${String(
															e.ben_id
													  ).substring(
															0,
															3
													  )}...${String(
															e.ben_id
													  ).substring(16)}`
													: String(e.ben_id)}
											</td>
											<td className="truncate text-left pl-2">
												{e.card_name}
											</td>
											<td className="truncate">
												{e.card_gender}
											</td>
											<td className="truncate">
												{String(
													new Date(
														String(e.card_yob)
													).getFullYear()
												)}
											</td>
											<td className="truncate text-left pl-4">
												{e.card_address}
											</td>
											<td>
												{e.status === 2
													? "Success"
													: e.status === 3
													? "Failed"
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
			{isLoading && <Loader title="Data Sync in Progress..." />}
			{isLoginModal && (
				<LoginModal
					setUsername={setUsername}
					setisLoginModal={setisLoginModal}
					setisLoggedIn={setisLoggedIn}
				/>
			)}
		</div>
	);
};

export default DashboardComponent;
