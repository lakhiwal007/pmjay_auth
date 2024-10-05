"use client";
import { useEffect, useMemo, useRef, useState } from "react";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "@/public/qr-frame.svg";
import Image from "next/image";
import useQrString from "@/hooks/useQrString";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import toast from "react-hot-toast";
import TextController from "./TextController";
import DateController from "./DateController";
import RadioController from "./RadioController";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdharSchema } from "@/utils/schema";
import { GenderRadio } from "@/utils/constants";

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

	const { name, address, dob, gender } = useQrString(scannedResult);

	useEffect(() => {
		if (name !== null && dob !== null && gender !== null) {
			toast.success("Data Fetched successfully!");
			const [day, month, year] = dob.split("/");
			const _dob = new Date(Number(year), Number(month) - 1, Number(day));
			setValue("name", name, {
				shouldValidate: true,
			});
			setValue("gender", gender, {
				shouldValidate: true,
			});
			setValue("dob", _dob, {
				shouldValidate: true,
			});

			setValue("address", address, {
				shouldValidate: true,
			});
		}
	}, [name, address, dob, gender, setValue]);

	// Success
	const onScanSuccess = (result: QrScanner.ScanResult) => {
		// 🖨 Print the "result" to browser console.
		console.log(result);
		// ✅ Handle success.
		// 😎 You can do whatever you want with the scanned result.
		setValue("gender", "F");
		setScannedResult(result?.data);
	};

	// Fail
	const onScanFail = (err: string | Error) => {
		// 🖨 Print the "err" to browser console.
		console.log(err);
	};

	// ❌ If "camera" is not allowed in browser permissions, show an alert.
	useEffect(() => {
		if (!qrOn)
			alert(
				"Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
			);
	}, [qrOn]);

	const handleScan = () => {
		setShowVideo(true);
		if (videoEl?.current && !scanner.current) {
			// 👉 Instantiate the QR Scanner
			scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
				onDecodeError: onScanFail,
				// 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
				preferredCamera: "environment",
				// 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
				highlightScanRegion: true,
				// 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
				highlightCodeOutline: true,
				// 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
				overlay: qrBoxEl?.current || undefined,
			});

			// 🚀 Start QR Scanner
			scanner?.current
				?.start()
				.then(() => setQrOn(true))
				.catch((err) => {
					if (err) setQrOn(false);
				});
		} else {
			scanner.current?.start();
		}
	};

	const handleClose = () => {
		scanner.current?.stop();
		setShowVideo(false);
		reset();
		setScannedResult("");
	};

	const onSubmit = (data: FieldValues) => {
		console.log(data);
	};

	return (
		<div className="qr-reader w-full ">
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
			<div
				className={`w-full h-[50vh] mt-4 rounded shadow-lg border-2 border-gray-500 ${
					showVideo ? "flex" : "hidden"
				}`}
			>
				<video ref={videoEl}></video>
				<div ref={qrBoxEl} className="qr-box">
					<Image
						src={QrFrame}
						alt="Qr Frame"
						width={256}
						height={256}
						className="qr-frame"
					/>
				</div>
			</div>
			<form
				onSubmit={() => handleSubmit(onSubmit)}
				className="w-full flex flex-col space-y-4 my-4 px-2"
			>
				<div className="w-full">
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
					<RadioController
						name={"gender"}
						control={control}
						error={errors.gender?.message}
						data={GenderRadio}
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
						className="bg-slate-200 shadow-md px-4 py-2 rounded border-[1px]  active:shadow-none"
					>
						Reset
					</button>
					<button
						type="submit"
						className="bg-orange-700 shadow-md px-4 py-2 rounded text-white active:shadow-none"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default QrReader;
