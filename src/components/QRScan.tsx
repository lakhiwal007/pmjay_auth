"use client";
import { useEffect, useRef, useState } from "react";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "@/public/qr-frame.svg";
import Image from "next/image";
import useQrString from "@/hooks/useQrString";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const QrReader = ({ setValue }: any) => {
	// QR States
	const scanner = useRef<QrScanner>();
	const videoEl = useRef<HTMLVideoElement>(null);
	const qrBoxEl = useRef<HTMLDivElement>(null);
	const [qrOn, setQrOn] = useState<boolean>(true);

	// Result
	const [scannedResult, setScannedResult] = useState<string>("");

	const { name, address, dob, gender } = useQrString(scannedResult);
	useEffect(() => {
		if (name !== null && dob !== null) {
			const [day, month, year] = dob.split("/");
			const _dob = new Date(Number(year), Number(month) - 1, Number(day));
			console.log("gender", gender);
			setValue("name", name);
			setValue("dob", _dob);
			setValue("gender", gender || "M", {
				shouldValidate: true,
			});
			setValue("address", address);
		}
	}, [name, address, dob, gender, setValue]);

	// Success
	const onScanSuccess = (result: QrScanner.ScanResult) => {
		// 🖨 Print the "result" to browser console.
		console.log(result);
		// ✅ Handle success.
		// 😎 You can do whatever you want with the scanned result.
		setScannedResult(result?.data);
	};

	// Fail
	const onScanFail = (err: string | Error) => {
		// 🖨 Print the "err" to browser console.
		console.log(err);
	};

	useEffect(() => {
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
		}

		// 🧹 Clean up on unmount.
		// 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
		return () => {
			if (!videoEl?.current) {
				scanner?.current?.stop();
			}
		};
	}, []);

	// ❌ If "camera" is not allowed in browser permissions, show an alert.
	useEffect(() => {
		if (!qrOn)
			alert(
				"Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
			);
	}, [qrOn]);

	return (
		<div className="qr-reader w-full ">
			{/* QR */}
			<div className="w-full flex space-x-4">
				<button
					className="flex items-center px-4 py-2 rounded shadow-lg bg-green-700 text-white active:shadow-none"
					type="button"
					onClick={() => scanner.current?.start()}
				>
					Scan QR
					<MdOutlineQrCodeScanner className="ml-2 w-6 h-6" />
				</button>
				<button
					className="px-4 py-2 rounded shadow-lg bg-red-700 text-white active:shadow-none"
					type="button"
					onClick={() => scanner.current?.stop()}
				>
					Close
				</button>
			</div>
			<div className="w-full h-[50vh] mt-4 rounded shadow-lg border-2 border-gray-500">
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

			{/* Show Data Result if scan is success */}
			{scannedResult && (
				<ul className="w-full relative">
					<li>Name: {name}</li>
					<li>gender: {gender}</li>
					<li>dob: {dob}</li>
					<li>address: {address}</li>
				</ul>
			)}
		</div>
	);
};

export default QrReader;
