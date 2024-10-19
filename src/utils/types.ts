export type ADHAR_TYPE = {
	id: string;
	name: string;
	address: string;
	dob: Date;
	gender: string;
	status: number;
	timeAt: string;
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
