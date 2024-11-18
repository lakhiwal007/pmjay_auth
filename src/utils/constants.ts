export const GenderRadio = [
	{ value: "M", label: "Male" },
	{ value: "F", label: "Female" },
	{ value: "O", label: "Other" },
];

export const QrText = String(
	'Scanned Result: <?xml version="1.0" encoding="UTF - 8"?> <PrintLetterBarcodeData uid="491773702372" name="Ankit Lakhiwal" gender="M" yob="2002" co="S / O Prabhu Dayal Lakhiwal" lm="goru balae ki dhani" vtc="Khorabeesal" po="Khora Bisal" dist="Jaipur" subdist="Amber" state="Rajasthan" pc="302012" dob="26 /04 / 2002"/>'
);

export const AUTHMODE = [
	{ value: "16", label: "Password" },
	{ value: "56", label: "Mobile_OTP" },
];

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
		familyId: "1234567890123456789",
		memberId: "123456789012345678904",
		adharNumber: "123456789102",
		name: "Sunny",
		gender: "Male",
		dob: "2003-02-22",
		address: "123 Main Street, Mumbai, Maharashtra",
	},
	{
		familyId: "1234567890123456789",
		memberId: "123456789012345678905",
		adharNumber: "123456789103",
		name: "Meenakshi",
		gender: "Female",
		dob: "2015-04-11",
		address: "123 Main Street, Mumbai, Maharashtra",
	},
	{
		familyId: "1234567890123456789",
		memberId: "123456789012345678906",
		adharNumber: "123456789103",
		name: "Mridul",
		gender: "Male",
		dob: "2024-05-01",
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

export const BASE64_IMG =
	"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";

export const TOKEN =
	"eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4R0NNIiwidHlwIjoiSldUIiwiY3R5IjoiSldUIiwiemlwIjoiREVGIiwia2lkIjoiMyJ9.0KedYM5kHGZT7bQZLncBZLmUYzmtVDNX.wa4D2yKIJjTiOMwn.RmISzcJmSTAoCMmjuYbL6sMKM9DmRQ6PWlmdN26Ec3rBSu44jVAf7E0835kxivAofar-cY3B5yHvj4ch5crH8pjs-1tx5W_jQC5N8axSvJS9QliuZ20xtI2Fen0eZmpEd2ABzet_nLaw_3jGK2Vb-ZZ4SDsTbzLzUdF9-uiWNfBM6HdlOCWft7AkwYm6vlY9kCHtcD-8a9QkfzwUXUd8CZm7HCDeiHParPvIYJtrKUW9oHRd28mT7xTjbNFElES6WGxkahOAmTqFNP80lJLT6n1gfnGfBlyJ7x6PGCSDL6sdXo2y38gx8JE9nKVkDOJadytFRKfxC5BigInspzLw3YPk5k63U7_lJYuCJz4dWVA4YcFoiPT-U1NFNGHvXCFtcxH6Ew5XRwHhV9xrIrtd1IIVkRj2fcMVDG6LnF9nfREanzOt5B7mOBGKPVHbzpgwFLyWEiaNddeGnFUVCkwoQccJYERRy7blp1zH0w1P_4MQrQS8-viybapCLVVwsHkRS_KcEVWd1qxQB6Bf09Vob6ZCiATZs_RjoTzn5fO5x5YHz_YruSvoHN1yFPg3UIqGUVwgqIeuwZ6EBhvAfWIQ3-syq2TkdTtU8jovN90CPE1h3CVuz8vDozqSp-5gMvcFX4YyhDAq3q6uPLgUSlWoiFTYywFZu0amItjW8bpgZUS5N9WD1e0BSS8gk8Rj_LTmpVdbcjCZvkWdDAqveeYgSV1owIjmIxgODb8MfojVjCo4SWpsr1gEzpu-62nylvPdixWI2sIpQd-GFb0xrJrm478PEm0MZ_W_KV_5qxExU0WxqCZ7CEn4WJMXsZ2q8HKaGCm5dqLPifD5UziS8ogI3fdHH9O-xhOspgIhU6szITjeALw8EfhnHYtXbi0lTc3xwj5LWLg-qyMdnTMQMq0hKYLXuDbu4kwojmo1nmx5-rK_b616O0rrW3eKpfL3wD8jDpApT6_SELMXYnbYJaIzkS_UD59nmJqSgDrCjK_ty0_CeR3yx9RokPTBHJWz3oqoaRb7wpS_5UkofeG9LGjXgnr2xt9wTepbHsq283HmXQopQSJh2UHf0XAdB_WwKyr9fJBBWRMqSg1BuXJkuP-RAwbkGqNdAoGXBVdgjabMCgM8wLKQcHHBm6R3mZQFAEIUuS1cSWxiv6knU4R7ppnZ8tWltSXWXmgXArYUQ9_DRQAkC6quoFv8bIy9HYlBcRVGTC04aIACC6CYcoerDKyDdvR-bQ9TXMdDn8sHWYTQYnAvW26LFfwXkK3BraZfOgETQBxZRBaFCuBdaJBMMGGCVpka1-PMYfvG7ffKzulWhSwDbsZPRDv1XAfzNPqNFfHQQUIjG0zu6DfDDlYSU3Uugggi75hEelD0gIS_ubI51pOWq9hUnTTW1xmF.abiN1_n-DC2PmEZ73TR7Vg";

export const encryptedGenToken =
	"7996edfc7824d1fc151e0ccd5c1e6b00c4d8e1172aa64879393f8213453fa62dcd9cee106b88cd40d421f3d4edfb43a3ggpVY1F/wYzm6uL5scoXWak9oB50fJbp9mevCVqTS0QPnfryp8u0UV6f8TH7hxzdj9QIoLCHLjcTxk2x5znHKA==";

export const apiHeaders = {
	accept: "application/json, text/plain, */*",
	appname: "BIS",
	"cache-control": "no-cache",
	"content-type": "application/json; charset=UTF-8",
	pragma: "no-cache",
	"sec-ch-ua-mobile": "?0",
	"sec-ch-ua-platform": '"Windows"',
	"sec-fetch-dest": "empty",
	"sec-fetch-mode": "cors",
	"sec-fetch-site": "cross-site",
	"Request-Agent": "web",
};

export const apiHeaders1 = {
	accept: "application/json, text/plain, */*",
	"access-control-allow-origin":
		"http://af5beb54405ee4e7590f45cac37f4270-dd87417d49b6d4b6.elb.ap-south-1.amazonaws.com/ui-bp",
	appname: "BIS",
	"cache-control": "no-cache",
	"content-type": "application/json; charset=UTF-8",
	origin: "http://localhost:8080",
	pragma: "no-cache",
	referer: "http://localhost:8080/",
	"sec-ch-ua":
		'"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
	"sec-ch-ua-mobile": "?0",
	"sec-ch-ua-platform": '"Windows"',
	"sec-fetch-dest": "empty",
	"sec-fetch-mode": "cors",
	"sec-fetch-site": "cross-site",
	"user-agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
};
