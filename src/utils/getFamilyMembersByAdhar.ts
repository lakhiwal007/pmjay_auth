import { FamilyMemberData, SCANEDATATYPE } from "./types";

export default function getFamilyMembersByAdhar(
	adharNumber: string
): FamilyMemberData[] {
	// Find the familyId corresponding to the adharNumber
	let data = "";
	let ScanData = "";
	try {
		data = localStorage.getItem("data") || "";
		ScanData = localStorage.getItem("notSyncedData") || "";
	} catch (error) {
		data = "";
		ScanData = "";
	}
	let FAMILY_DATA = [];
	let Scan_Data: SCANEDATATYPE;
	if (data !== "") {
		FAMILY_DATA = JSON.parse(data);
	}
	if (ScanData !== "") {
		Scan_Data = JSON.parse(ScanData);
	}
	// console.log(FAMILY_DATA);
	const member = FAMILY_DATA.find((member: FamilyMemberData) => {
		return (
			member.aadhar_id === adharNumber &&
			member.card_name === Scan_Data.name &&
			member.card_gender === Scan_Data.gender &&
			new Date(member.card_yob).toLocaleDateString() ===
				new Date(Scan_Data.dob).toLocaleDateString()
		);
	});

	// If no matching adharNumber found, return null
	if (!member) {
		return [];
	}

	const familyId = member.family_id;

	// Filter and return all members that belong to the same familyId
	return FAMILY_DATA.filter(
		(member: FamilyMemberData) => member.family_id === familyId
	);
}
