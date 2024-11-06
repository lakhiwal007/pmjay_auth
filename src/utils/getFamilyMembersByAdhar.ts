import { FamilyMember, FamilyMemberData } from "./types";

export default function getFamilyMembersByAdhar(
	adharNumber: string
): FamilyMemberData[] {
	// Find the familyId corresponding to the adharNumber
	let data = "";
	try {
		data = localStorage.getItem("data") || "";
	} catch (error) {
		data = "";
	}
	let FAMILY_DATA = [];
	if (data !== "") {
		FAMILY_DATA = JSON.parse(data);
	}
	// console.log(FAMILY_DATA);
	const member = FAMILY_DATA.find(
		(member: FamilyMemberData) => member.aadhar_id === adharNumber
	);

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
