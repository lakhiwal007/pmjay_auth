// file = Html5QrcodePlugin.jsx
import {
	Html5QrcodeScanner,
	Html5QrcodeScanType,
	Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

const Html5QrcodePlugin = (props: any) => {
	useEffect(() => {
		const verbose = props.verbose === true;
		// Suceess callback is required.
		if (!props.qrCodeSuccessCallback) {
			throw "qrCodeSuccessCallback is required callback.";
		}
		const html5QrcodeScanner = new Html5QrcodeScanner(
			qrcodeRegionId,
			{
				fps: 10,
				qrbox: { width: 250, height: 250 },
				formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
				showTorchButtonIfSupported: true,
				rememberLastUsedCamera: true,
				showZoomSliderIfSupported: true,
				supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
			},
			verbose
		);
		html5QrcodeScanner.render(
			props.qrCodeSuccessCallback,
			props.qrCodeErrorCallback
		);

		// cleanup function when component will unmount
		return () => {
			html5QrcodeScanner.clear().catch((error) => {
				console.error("Failed to clear html5QrcodeScanner. ", error);
			});
		};
	}, [props]);

	return <div id={qrcodeRegionId} className="border-none" />;
};

export default Html5QrcodePlugin;
