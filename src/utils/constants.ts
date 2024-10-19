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

export const FAMILY_DATA = [
	{
		familyId: "1234567890123456789",
		memberId: "123456789012345678901",
		adharNumber: "491773702372",
		name: "Ankit Lakhiwal",
		gender: "Male",
		dob: "2002-04-26",
		address: "jaipur, rajasthan",
	},
	{
		familyId: "1234567890123456789",
		memberId: "123456789012345678902",
		adharNumber: "123456789102",
		name: "Sunita Kumar",
		gender: "Female",
		dob: "1982-09-20",
		address: "123 Main Street, Mumbai, Maharashtra",
	},
	{
		familyId: "1234567890123456789",
		memberId: "123456789012345678903",
		adharNumber: "123456789103",
		name: "Rohit Kumar",
		gender: "Male",
		dob: "2010-07-15",
		address: "123 Main Street, Mumbai, Maharashtra",
	},
	{
		familyId: "2234567890123456789",
		memberId: "223456789012345678901",
		adharNumber: "567812349104",
		name: "Ramesh Singh",
		gender: "Male",
		dob: "1975-03-08",
		address: "456 Park Avenue, Delhi",
	},
	{
		familyId: "2234567890123456789",
		memberId: "223456789012345678902",
		adharNumber: "567812349105",
		name: "Meena Singh",
		gender: "Female",
		dob: "1978-11-25",
		address: "456 Park Avenue, Delhi",
	},
	{
		familyId: "2234567890123456789",
		memberId: "223456789012345678903",
		adharNumber: "567812349106",
		name: "Pooja Singh",
		gender: "Female",
		dob: "2005-02-11",
		address: "456 Park Avenue, Delhi",
	},
];
