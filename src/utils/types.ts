export type ADHAR_TYPE = {
	id: string;
	name: string;
	address: string;
	dob: Date;
	gender: string;
	status: number;
	timeAt: string;
};

export type SCANEDATATYPE = {
	name: string;
	address: string;
	dob: Date;
	gender: string;
	status: number;
	timeAt: string;
	uid: string;
	adhar_number: string;
};

export type LoginType = {
	username: string;
	password: string;
};

export type FamilyMember = {
	familyId: string;
	memberId: string;
	adharNumber: string;
	name: string;
	gender: string;
	dob: string;
	address: string;
};

export type FamilyMemberData = {
	family_id: string;
	ben_id: string;
	aadhar_id: string;
	card_name: string;
	card_gender: string;
	card_yob: string;
	card_address: string;
};

export type FamilyMemberNotSyncedData = {
	family_id: string;
	ben_id: string;
	aadhar_id: string;
	card_name: string;
	card_gender: string;
	card_yob: string;
	card_address: string;
	status: number;
	delivered: boolean;
	deliveredAt: string;
};

export type FamilyMemberNotSynced = {
	familyId: string;
	memberId: string;
	adharNumber: string;
	name: string;
	gender: string;
	dob: string;
	address: string;
	status: number;
	delivered: boolean;
	deliveredAt: string;
};
