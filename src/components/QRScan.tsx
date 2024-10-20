"use client";
import { useEffect, useState } from "react";

import { MdOutlineQrCodeScanner } from "react-icons/md";
import toast from "react-hot-toast";
import TextController from "./TextController";
import DateController from "./DateController";
import { Controller, FieldValues, useForm } from "react-hook-form";
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
		formState: { errors, isSubmitting },
	} = useForm({
		mode: "all",
		defaultValues: {
			gender: "",
		},
		resolver: yupResolver(AdharSchema),
	});

	const [showVideo, setShowVideo] = useState<boolean>(true);

	// Result
	const [scannedResult, setScannedResult] = useState<string>("");
	const [isLoading, setisLoading] = useState(false);

	const router = useRouter();
	const [isScanedField, setIsScanedField] = useState(false);
	const [isAdharDisable, setIsAdharDisable] = useState(false);
	const [name, setname] = useState("");
	const [address, setaddress] = useState("");
	const [dob, setdob] = useState<Date | null>(null);
	const [gender, setgender] = useState("");
	const [uidNum, setuid] = useState("");

	useEffect(() => {
		if (scannedResult && scannedResult.includes("<?xml")) {
			const { uid, name, address, dob, gender } = QrString(scannedResult);
			setuid(uid);
			setname(name);
			setaddress(address);
			setgender(gender);
			setdob(dob);
		} else if (scannedResult) {
			const { refId, name, address, dob, gender } =
				DecodeAdharQr(scannedResult);
			setuid(refId);
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
			// window.navigator.vibrate(200);
			if (!(uidNum.length > 12)) {
				setValue("adhar_number", uidNum, {
					shouldDirty: true,
					shouldValidate: true,
				});
				setIsAdharDisable(true);
			}
			setValue("name", name, {
				shouldDirty: true,
				shouldValidate: true,
			});
			setValue("gender", gender, {
				shouldDirty: true,
				shouldValidate: true,
			});
			setValue("dob", dob, {
				shouldDirty: true,
				shouldValidate: true,
			});

			setValue("address", address, {
				shouldDirty: true,
				shouldValidate: true,
			});
			setIsScanedField(true);
			setShowVideo(false);
		}
	}, [name, address, dob, gender, setValue, uidNum]);

	const handleScan = () => {
		setShowVideo(true);
	};

	const handleClose = () => {
		setIsScanedField(false);
		setIsAdharDisable(false);
		setShowVideo(false);
		reset();
		setScannedResult("");
	};

	const onSubmit = async (data: FieldValues) => {
		// window.navigator.vibrate(200);
		setisLoading(true);
		const timeAt = new Date().toLocaleTimeString();
		const status = 1;
		const newObj = {
			timeAt,
			status,
			uid: uidNum,
			...data,
		};

		const NotSyncedDataString = localStorage.getItem("notSyncedData") || "";
		const NotSyncedData = JSON.parse(NotSyncedDataString);
		const newData = [newObj, ...NotSyncedData];
		localStorage.setItem("AadharNumber", data.adhar_number);
		localStorage.setItem("notSyncedData", JSON.stringify(newData));
		setisLoading(false);
		router.push("/family_details");
	};

	return (
		<div className="w-full">
			{/* QR */}
			<div className="w-full flex space-x-4">
				{!showVideo && (
					<button
						className="flex items-center px-4 py-2 rounded shadow-lg bg-green-700 text-white active:shadow-none"
						type="button"
						onClick={handleScan}
					>
						Scan QR
						<MdOutlineQrCodeScanner className="ml-2 w-6 h-6" />
					</button>
				)}
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
				<div className="w-full relative rounded flex items-center justify-center my-4 mx-auto">
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
						formats={["qr_code", "rm_qr_code"]}
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
					<p className="font-semibold">
						Aadhar Number
						<span className="text-orange-600">*</span>
					</p>

					<div className="w-full flex flex-col">
						<Controller
							name={"adhar_number"}
							control={control}
							defaultValue={""}
							render={({ field }) => (
								<input
									{...field}
									type={"tel"}
									pattern="[0-9]{12}"
									maxLength={12}
									disabled={isAdharDisable}
									className={`w-full disabled:bg-[rgb(244,244,242)] ${
										errors.adhar_number?.message !==
										undefined
											? "border-orange-600 focus-within:border-orange-600"
											: "focus-within:border-sky-500"
									}  p-2 border-[1.9px] border-gray-300 focus:border-2 rounded-[5px] outline-none`}
								/>
							)}
						/>
						{errors.adhar_number?.message && (
							<p className="text-orange-600">
								{errors.adhar_number?.message}
							</p>
						)}
					</div>
				</div>
				<div className="w-full relative">
					<p className="font-semibold">
						Name
						<span className="text-orange-600">*</span>
					</p>
					<TextController
						name="name"
						control={control}
						error={errors.name?.message}
						maxLength={50}
						disable={isScanedField}
					/>
				</div>
				<div className="w-full">
					<p className="font-semibold">
						Gender<span className="text-orange-600">*</span>
					</p>

					<SelectInput
						name={"gender"}
						control={control}
						error={errors?.gender?.message}
						OptionList={GenderRadio}
						disable={isScanedField}
					/>
				</div>
				<div className="w-full">
					<p className="font-semibold">
						Date of Birth<span className="text-orange-600">*</span>
					</p>
					<DateController
						name={"dob"}
						error={errors.dob?.message}
						control={control}
						disable={isScanedField}
					/>
				</div>
				<div className="w-full">
					<p className="font-semibold">
						Address
						<span className="text-orange-600">*</span>
					</p>
					<div className="w-full flex flex-col">
						<Controller
							name={"address"}
							control={control}
							defaultValue={""}
							render={({ field }) => (
								<textarea
									{...field}
									rows={3}
									maxLength={250}
									disabled={isScanedField}
									className={`w-full disabled:bg-[rgb(244,244,242)] ${
										errors.address?.message !== undefined
											? "border-orange-600 focus-within:border-orange-600"
											: "focus-within:border-sky-500"
									}  p-2 border-[1.9px] border-gray-300 focus:border-2 rounded-[5px] outline-none`}
								/>
							)}
						/>
						{errors.address?.message && (
							<p className="text-orange-600">
								{errors.address?.message}
							</p>
						)}
					</div>
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
						disabled={isSubmitting}
						className="w-full bg-orange-700 shadow-md px-4 py-2 rounded text-white active:shadow-none"
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default QrReader;
