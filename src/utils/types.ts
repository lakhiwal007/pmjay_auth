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

export type CardDetails = {
	card_no: string;
	entity_id: string;
	batch_id: string;
	user_id: string;
	state_cd: number;
	district_cd: number;
	subdistrict_town: number;
	village_ward: number;
	urban_or_rural: string;
	card_name: string;
	card_fathername: string;
	card_relation: string;
	card_yob: number;
	card_gender: string;
	card_address: string;
	abha_no: string;
	card_photo: string;
	card_print_status: string;
	enroll_date: string;
	approve_date: string;
	card_gen_date: string;
	card_print_date: string;
	card_distribute_date: string;
	card_deliver_date: string;
	ben_id: number;
	aadhar_id: number;
	family_id: number;
	age: number;
	source_type: string;
	created_by: string;
	created_dt: string;
	updated_by: string;
	updated_dt: string;
	mobile_number: string;
	operator_id: string;
	operator_name: string;
	operator_contact: string;
	state_name: string;
	district_name: string;
	sub_district_name: string;
	village_name: string;
};
