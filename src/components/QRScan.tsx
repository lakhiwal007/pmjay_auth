"use client";
import { useEffect, useRef, useState } from "react";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "@/public/qr-frame.svg";
import Image from "next/image";
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

	// QR States
	const scanner = useRef<QrScanner>();
	const videoEl = useRef<HTMLVideoElement>(null);
	const qrBoxEl = useRef<HTMLDivElement>(null);
	const [qrOn, setQrOn] = useState<boolean>(true);
	const [showVideo, setShowVideo] = useState<boolean>(false);

	// Result
	const [scannedResult, setScannedResult] = useState<string>("");

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
			toast.success("Data Fetched successfully!");
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
		}
	}, [name, address, dob, gender, setValue]);

	// // Success
	// const onScanSuccess = (result: QrScanner.ScanResult) => {
	// 	// 🖨 Print the "result" to browser console.
	// 	console.log(result);
	// 	// ✅ Handle success.
	// 	// 😎 You can do whatever you want with the scanned result.
	// 	setScannedResult(result?.data);
	// };

	// // Fail
	// const onScanFail = (err: string | Error) => {
	// 	// 🖨 Print the "err" to browser console.
	// 	console.log(err);
	// };

	// // ❌ If "camera" is not allowed in browser permissions, show an alert.
	// useEffect(() => {
	// 	if (!qrOn)
	// 		alert(
	// 			"Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
	// 		);
	// }, [qrOn]);

	// const handleScan = (result: any) => {
	// 	setShowVideo(true);
	// 	console.log("result:", result.rawValue);
	// 	if (videoEl?.current && !scanner.current) {
	// 		// 👉 Instantiate the QR Scanner
	// 		scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
	// 			onDecodeError: onScanFail,
	// 			// 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
	// 			preferredCamera: "environment",
	// 			// 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
	// 			highlightScanRegion: true,
	// 			// 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
	// 			highlightCodeOutline: true,
	// 			// 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
	// 			overlay: qrBoxEl?.current || undefined,
	// 		});

	// 		// 🚀 Start QR Scanner
	// 		scanner?.current
	// 			?.start()
	// 			.then(() => setQrOn(true))
	// 			.catch((err) => {
	// 				if (err) setQrOn(false);
	// 			});
	// 	} else {
	// 		scanner.current?.start();
	// 	}
	// };

	const handleScan = () => {
		setShowVideo(true);
	};

	const handleClose = () => {
		scanner.current?.stop();
		setShowVideo(false);
		reset();
		setScannedResult("");
	};

	const onSubmit = async (data: FieldValues) => {
		console.log(data);
		const response = await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const res = await response.json();
		}
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
				<div className="w-full relative rounded my-4">
					<Scanner
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
			{/* <div
				className={`w-full h-[50vh] mt-4 rounded shadow-lg border-2 border-gray-500 ${
					showVideo ? "flex" : "hidden"
				}`}
			>
				<video ref={videoEl}></video>
				<div ref={qrBoxEl} className="qr-box">
					<Image
						src={QrFrame}
						alt="Qr Frame"
						width={300}
						height={300}
						className="qr-frame"
					/>
				</div>
			</div> */}
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
