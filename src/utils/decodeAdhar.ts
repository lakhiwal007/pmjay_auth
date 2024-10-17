import toast from "react-hot-toast";

var pako = require("pako");
export const DecodeAdharQr = (qrcode: string) => {
	// console.log("qrcode", qrcode);

	// Check if the qrcode is a large numeric string
	const isNumeric = /^\d+$/.test(qrcode);

	if (!isNumeric) {
		toast.error("Invalid QR code format", {
			position: "bottom-center",
		});
		return { refId: "", name: "", gender: "", dob: null, address: "" };
	}

	// Step 1: Convert the Base-10 value into a Big Integer (in JS, this is a BigInt)
	let base10Value: bigint;
	try {
		base10Value = BigInt(qrcode);
	} catch (error) {
		console.error("Failed to convert QR code to BigInt:", error);
		return { refId: "", name: "", gender: "", dob: null, address: "" };
	}
	// Step 2: Convert the Big Integer into a byte array
	const byteArray = BigIntToByteArray(base10Value);

	// Helper function to convert BigInt to byte array
	function BigIntToByteArray(bigIntValue: bigint): Uint8Array {
		// console.log("bigIntValue", bigIntValue);
		const hex = bigIntValue.toString(16);
		// console.log("hex", hex);
		const len = Math.ceil(hex.length / 2);
		const byteArray = new Uint8Array(len);

		for (let i = 0; i < len; i++) {
			byteArray[i] = parseInt(hex.substr(i * 2, 2), 16);
		}
		return byteArray;
	}
	// console.log("byteArray", byteArray);

	// Step 3: Decompress the byte array using zlib
	let decompressedBytes: Uint8Array;
	try {
		decompressedBytes = pako.inflate(byteArray);
		// console.log("decompressedBytes", decompressedBytes);
	} catch (error) {
		toast.error("Invalid QR Format", {
			position: "bottom-center",
		});
		return { refId: "", name: "", gender: "", dob: null, address: "" };
	}

	// Step 4: Find the first occurrence of delimiter (255) and extract the Email/Mobile Present Indicator
	const firstDelimiterIndex = decompressedBytes.indexOf(255);
	if (firstDelimiterIndex === -1) {
		console.error("Delimiter 255 not found.");
		return { refId: "", name: "", gender: "", dob: null, address: "" };
	}

	const extractedBytes = decompressedBytes.slice(0, firstDelimiterIndex);
	const emailMobilePresentBitIndicator = parseInt(
		Buffer.from(extractedBytes).toString("latin1"),
		10
	);

	// Step 5: Process the fields until the VTC field is hit
	let currentIndex = firstDelimiterIndex + 1;
	let fields: string[] = [];

	while (currentIndex < decompressedBytes.length) {
		const nextDelimiterIndex = decompressedBytes.indexOf(255, currentIndex);
		// console.log("nextDelimiterIndex", nextDelimiterIndex);
		if (nextDelimiterIndex === -1) {
			break;
		}

		const fieldValue = Buffer.from(
			decompressedBytes.slice(currentIndex, nextDelimiterIndex)
		).toString("latin1");
		fields.push(fieldValue);
		currentIndex = nextDelimiterIndex + 1;
	}

	const AdharJson: { [key: string]: string } = {};
	const adharKey = [
		"referenceId",
		"name",
		"dob",
		"gender",
		"careOf",
		"district",
		"landmark",
		"house",
		"location",
		"pinCode",
		"postOffice",
		"State",
		"Street",
		"SubDistrict",
	];

	// console.log("fields", fields);

	for (let i = 0; i < adharKey.length; i++) {
		const key = adharKey[i];
		if (fields[0].length === 1) {
			AdharJson[key] = fields[i + 1];
		} else {
			AdharJson[key] = fields[i];
		}
	}

	const refId = AdharJson["referenceId"];

	const name = AdharJson["name"];
	const gender = AdharJson["gender"];
	const dob = AdharJson["dob"];

	const address = [
		AdharJson["house"],
		AdharJson["location"],
		AdharJson["landmark"],
		AdharJson["Street"],
		AdharJson["postOffice"],
		AdharJson["SubDistrict"],
		AdharJson["district"],
		AdharJson["State"],
		AdharJson["pinCode"],
	]
		.filter(Boolean)
		.join(", ");

	let _dob: Date = new Date();
	if (dob && dob.includes("/")) {
		const [day, month, year] = dob.split("/");
		// console.log(Number(year), Number(month) - 1, Number(day));
		_dob = new Date(Number(year), Number(month) - 1, Number(day));
	} else if (dob && dob.includes("-")) {
		const [day, month, year] = dob.split("-");
		// console.log(Number(year), Number(month) - 1, Number(day));
		_dob = new Date(Number(year), Number(month) - 1, Number(day));
	} else {
		_dob = new Date(Number(dob), 0, 1);
	}

	return { refId, name, gender, dob: _dob, address };
};
