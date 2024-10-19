import { FAMILY_DATA } from "./constants";
import { FamilyMember } from "./types";

export default function getFamilyMembersByAdhar(
	adharNumber: string
): FamilyMember[] {
	// Find the familyId corresponding to the adharNumber
	const member = FAMILY_DATA.find(
		(member) => member.adharNumber === adharNumber
	);

	// If no matching adharNumber found, return null
	if (!member) {
		return [];
	}

	const familyId = member.familyId;

	// Filter and return all members that belong to the same familyId
	return FAMILY_DATA.filter((member) => member.familyId === familyId);
}
