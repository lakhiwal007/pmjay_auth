"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import getFamilyMembersByAdhar from "@/utils/getFamilyMembersByAdhar";
import { FamilyMemberData } from "@/utils/types";
import toast from "react-hot-toast";
import NODATA from "../../public/no_data_found.svg";
import Image from "next/image";
import Loader from "./Loader";
const FamilyComponent = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [aadharNum, setAdharNum] = useState("");
	const [familyData, setFamilyData] = useState<FamilyMemberData[]>([]);
	const [isLoading, setisLoading] = useState(false);

	useEffect(() => {
		// const userId = localStorage.getItem("userId") || "";
		const AdharNum = localStorage.getItem("AadharNumber") || "";
		// if (!userId) {
		// 	router.replace("/");
		// }
		if (!AdharNum) {
			router.replace("/");
		}
		const UserName = localStorage.getItem("username") || "";
		setAdharNum(AdharNum);
		setUsername(UserName);
		// console.log("AdharNum", AdharNum);
	}, [router]);

	useEffect(() => {
		if (aadharNum) {
			setisLoading(true);
			const data = getFamilyMembersByAdhar(aadharNum);
			// console.log("data", data);
			setFamilyData(data);
			setisLoading(false);
		}
	}, [aadharNum]);

	const [checkedItems, setCheckedItems] = useState<string[]>([]);

	const handleToggleCheckbox = (memberId: string) => {
		setCheckedItems(
			(prev) =>
				prev.includes(memberId)
					? prev.filter((id) => id !== memberId) // Uncheck if already checked
					: [...prev, memberId] // Add memberId to checked items
		);
	};

	const handleSubmit = () => {
		setisLoading(true);
		// Filter familyData to get only checked members
		const selectedMembers = familyData
			.filter((member) => checkedItems.includes(String(member.ben_id)))
			.map((member) => ({
				...member,
				status: 1,
				delivered: true,
				deliveredAt: new Date().toISOString(),
			}));

		if (selectedMembers.length === 0) {
			toast.error("Please select at least one member.", {
				position: "bottom-center",
			});
			setisLoading(false);
		} else {
			// console.log("Selected Members:", selectedMembers);
			// window.navigator.vibrate(200);

			const NotSyncedDataString =
				localStorage.getItem("notSyncedFamilyData") || "";
			if (NotSyncedDataString === "") {
				localStorage.setItem(
					"notSyncedFamilyData",
					JSON.stringify(selectedMembers)
				);
				router.replace("/");
				setisLoading(false);
			} else {
				const NotSyncedData = JSON.parse(NotSyncedDataString);
				const newData = [...selectedMembers, ...NotSyncedData];
				localStorage.setItem(
					"notSyncedFamilyData",
					JSON.stringify(newData)
				);
				router.replace("/");
				setisLoading(false);
			}
		}
	};

	return (
		<div className="max-w-[450px] min-h-screen flex flex-col items-center justify-start mx-auto">
			<Header username={username} />

			{familyData.length > 0 ? (
				<>
					<h1 className="w-full mt-4 font-semibold text-xl px-2">
						Family Members
					</h1>
					<div className="w-full mt-4 flex flex-col space-y-2 px-2">
						{familyData.map((e, index) => (
							<button
								key={index}
								className="w-full text-left relative grid grid-cols-3 gap-2 bg-blue-600/50 odd:bg-emerald-600/50 backdrop-blur-md  items-start p-4 rounded-md shadow-md border-[1px] active:shadow-none active:bg-blue-600/60 odd:active:bg-emerald-600/60"
								onClick={() =>
									handleToggleCheckbox(String(e.ben_id))
								}
							>
								<input
									className="absolute top-2 right-2"
									type="checkbox"
									name="memberId"
									id="memberId"
									checked={checkedItems.includes(
										String(e.ben_id)
									)} // Set checkbox checked state
									readOnly // Prevent manual change, controlled by button click
								/>
								<div className="col-span-2">
									<p className="font-semibold">Family ID</p>
									<p className="truncate">
										{String(e.family_id)}
									</p>
								</div>
								<div className="col-span-2">
									<p className="font-semibold">
										Aadhar Number
									</p>
									<p className="truncate">{`XXXXXXXX${String(
										e.aadhar_id
									).substring(8)}`}</p>
								</div>
								<div>
									<p className="font-semibold">
										Beneficiary ID
									</p>
									<p className="truncate">
										{String(e.ben_id).length > 10
											? `${String(e.ben_id).substring(
													0,
													4
											  )}...${String(e.ben_id).substring(
													15
											  )}`
											: String(e.ben_id)}
									</p>
								</div>

								<div>
									<p className="font-semibold">Name</p>
									<p className="truncate">{e.card_name}</p>
								</div>

								<div>
									<p className="font-semibold">Gender</p>
									<p className="truncate">{e.card_gender}</p>
								</div>

								<div>
									<p className="font-semibold">YOB</p>
									<p className="truncate">
										{new Date(
											String(e.card_yob)
										).getFullYear()}{" "}
									</p>
								</div>
							</button>
						))}
					</div>
					<div className="w-full p-4 my-4 bg-white/40 backdrop-blur-lg sticky bottom-0 z-50">
						<button
							type="button"
							onClick={handleSubmit}
							className="w-full relative bg-orange-700 shadow-md px-4 py-2 rounded text-white active:shadow-none"
						>
							Submit
						</button>
					</div>
				</>
			) : (
				<div className="w-full relative min-h-[50vh] flex items-center justify-center flex-col p-4">
					<p className="font-semibold text-2xl mt-4">No Data Found</p>
					<Image
						src={NODATA}
						width={200}
						height={200}
						className="w-full h-auto"
						alt="No Data Found"
					/>
				</div>
			)}

			{isLoading && <Loader />}
		</div>
	);
};

export default FamilyComponent;
