var pako = require("pako");
export const DecodeAdharQr = (qrcode: string) => {
	console.log("qrcode", qrcode);

	// Step 1: Convert the Base-10 value into a Big Integer (in JS, this is a BigInt)
	const base10Value = BigInt(qrcode);

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
		console.log("decompressedBytes", decompressedBytes);
	} catch (error) {
		console.error("Decompression error:", error);
		process.exit(1);
	}

	// Step 4: Find the first occurrence of delimiter (255) and extract the Email/Mobile Present Indicator
	const firstDelimiterIndex = decompressedBytes.indexOf(255);
	if (firstDelimiterIndex === -1) {
		console.error("Delimiter 255 not found.");
		process.exit(1);
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

	for (let i = 0; i < adharKey.length; i++) {
		const key = adharKey[i];
		AdharJson[key] = fields[i];
	}

	const name = AdharJson["name"];
	const gender = AdharJson["gender"];
	const dob = AdharJson["dob"];
	const address =
		AdharJson["house"] +
		AdharJson["location"] +
		AdharJson["landmark"] +
		AdharJson["Street"] +
		AdharJson["postOffice"] +
		AdharJson["SubDistrict"] +
		AdharJson["district"] +
		AdharJson["State"] +
		AdharJson["pinCode"];

	const [year, month, day] = dob.split("-");
	const _dob = new Date(Number(year), Number(month) - 1, Number(day));

	return { name, gender, dob: _dob, address };
};
