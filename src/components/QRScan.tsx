"use client";
import { useEffect, useState } from "react";

import { MdOutlineQrCodeScanner } from "react-icons/md";
import toast from "react-hot-toast";
import TextController from "./TextController";
import DateController from "./DateController";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdharSchema } from "@/utils/schema";
import { GenderRadio } from "@/utils/constants";
import SelectInput from "./SelectInput";
import QrString from "@/hooks/QrString";
import { DecodeAdharQr } from "@/utils/decodeAdhar";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";

const QrReader = () => {
	const {
		control,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "all",
		defaultValues: {
			gender: "",
		},
		resolver: yupResolver(AdharSchema),
	});

	const [showVideo, setShowVideo] = useState<boolean>(false);

	// Result
	const [scannedResult, setScannedResult] = useState<string>("");

	const router = useRouter();

	const [name, setname] = useState("");
	const [address, setaddress] = useState("");
	const [dob, setdob] = useState<Date | null>(null);
	const [gender, setgender] = useState("");

	useEffect(() => {
		if (scannedResult && scannedResult.includes("<?xml")) {
			const { name, address, dob, gender } = QrString(scannedResult);

			setname(name);
			setaddress(address);
			setgender(gender);
			setdob(dob);
		} else if (
			scannedResult &&
			typeof Number(scannedResult.at(0)) === typeof Number
		) {
			const { name, address, dob, gender } = DecodeAdharQr(scannedResult);
			setname(name);
			setaddress(address);
			setgender(gender);
			setdob(dob);
		}
	}, [scannedResult]);

	useEffect(() => {
		if (name && dob && gender) {
			toast.success("Data Fetched successfully!", {
				position: "bottom-center",
			});
			window.navigator.vibrate(200);
			setValue("name", name, {
				shouldValidate: true,
			});
			setValue("gender", gender, {
				shouldValidate: true,
			});
			setValue("dob", dob, {
				shouldValidate: true,
			});

			setValue("address", address, {
				shouldValidate: true,
			});
			setShowVideo(false);
		}
	}, [name, address, dob, gender, setValue]);

	const handleScan = () => {
		setShowVideo(true);
	};

	const handleClose = () => {
		setShowVideo(false);
		reset();
		setScannedResult("");
	};

	const onSubmit = async (data: FieldValues) => {
		const NotSyncedDataString = localStorage.getItem("notSyncedData") || "";
		const NotSyncedData = JSON.parse(NotSyncedDataString);
		const newData = [...NotSyncedData, data];
		localStorage.setItem("notSyncedData", JSON.stringify(newData));
		router.back();
	};

	return (
		<div className="w-full">
			{/* QR */}
			<div className="w-full flex space-x-4">
				<button
					className="flex items-center px-4 py-2 rounded shadow-lg bg-green-700 text-white active:shadow-none"
					type="button"
					onClick={handleScan}
				>
					Scan QR
					<MdOutlineQrCodeScanner className="ml-2 w-6 h-6" />
				</button>
				{showVideo && (
					<button
						className="px-4 py-2 rounded shadow-lg bg-red-700 text-white active:shadow-none"
						type="button"
						onClick={handleClose}
					>
						Close
					</button>
				)}
			</div>
			{showVideo && (
				<div className="w-full relative rounded my-4 mx-auto">
					<Scanner
						styles={{
							container: {
								width: "350px",
								height: "350px",
							},
						}}
						components={{
							torch: true,
							zoom: true,
							finder: true,
						}}
						formats={[
							"aztec",
							"code_128",
							"code_39",
							"code_93",
							"codabar",
							"databar",
							"databar_expanded",
							"data_matrix",
							"dx_film_edge",
							"ean_13",
							"ean_8",
							"itf",
							"maxi_code",
							"micro_qr_code",
							"pdf417",
							"qr_code",
							"rm_qr_code",
							"upc_a",
							"upc_e",
							"linear_codes",
							"matrix_codes",
							"unknown",
						]}
						onScan={(result) => {
							setScannedResult(result[0]?.rawValue || "");
						}}
					/>
				</div>
			)}

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full relative flex flex-col space-y-4 my-4 px-2"
			>
				<div className="w-full relative">
					<p>
						Name
						<span className="text-orange-600">*</span>
					</p>
					<TextController
						name="name"
						control={control}
						error={errors.name?.message}
						maxLength={50}
					/>
				</div>
				<div className="w-full">
					<p>
						Gender<span className="text-orange-600">*</span>
					</p>

					<SelectInput
						name={"gender"}
						control={control}
						error={errors?.gender?.message}
						OptionList={GenderRadio}
					/>
				</div>
				<div className="w-full">
					<p>
						Date of Birth<span className="text-orange-600">*</span>
					</p>
					<DateController
						name={"dob"}
						error={errors.dob?.message}
						control={control}
					/>
				</div>
				<div className="w-full">
					<p>
						Address
						<span className="text-orange-600">*</span>
					</p>
					<TextController
						name="address"
						control={control}
						error={errors.address?.message}
						maxLength={50}
					/>
				</div>
				<div className="w-full flex items-center space-x-4">
					<button
						type="button"
						onClick={handleClose}
						className="w-full bg-slate-200 shadow-md px-4 py-2 rounded border-[1px]  active:shadow-none"
					>
						Reset
					</button>
					<button
						type="submit"
						className="w-full bg-orange-700 shadow-md px-4 py-2 rounded text-white active:shadow-none"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default QrReader;
