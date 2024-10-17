export const GenderRadio = [
	{ value: "M", label: "Male" },
	{ value: "F", label: "Female" },
	{ value: "O", label: "Other" },
];

export const QrText = String(
	'Scanned Result: <?xml version="1.0" encoding="UTF - 8"?> <PrintLetterBarcodeData uid="491773702372" name="Ankit Lakhiwal" gender="M" yob="2002" co="S / O Prabhu Dayal Lakhiwal" lm="goru balae ki dhani" vtc="Khorabeesal" po="Khora Bisal" dist="Jaipur" subdist="Amber" state="Rajasthan" pc="302012" dob="26 /04 / 2002"/>'
);

export const STATUS = {
	NOT_SYNCED: 1,
	ACCEPTED: 2,
	REJECTED: 3,
};

export const STATUS_STRING = {
	1: "NOT_SYNCED",
	2: "ACCEPTED",
	3: "REJECTED",
};
