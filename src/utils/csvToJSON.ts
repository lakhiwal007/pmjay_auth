// Function to parse CSV and convert to JSON
export function csvToJson(csvData: string): any[] {
	const lines = csvData.trim().split("\n");
	const headers = lines[0].split(",");
	const checkHead = [
		'"card_no"',
		'"entity_id"',
		'"batch_id"',
		'"user_id"',
		'"state_cd"',
		'"district_cd"',
		'"subdistrict_town"',
		'"village_ward"',
		'"urban_or_rural"',
		'"card_name"',
		'"card_fathername"',
		'"card_relation"',
		'"card_yob"',
		'"card_gender"',
		'"card_address"',
		'"abha_no"',
		'"card_photo"',
		'"card_print_status"',
		'"enroll_date"',
		'"approve_date"',
		'"card_gen_date"',
		'"card_print_date"',
		'"card_distribute_date"',
		'"card_deliver_date"',
		'"ben_id"',
		'"aadhar_id"',
		'"family_id"',
		'"age"',
		'"source_type"',
		'"created_by"',
		'"created_dt"',
		'"updated_by"',
		'"updated_dt"',
		'"mobile_number"',
		'"operator_id"',
		'"operator_name"',
		'"operator_contact"',
		'"state_name"',
		'"district_name"',
		'"sub_district_name"',
		'"village_name"',
	];

	return lines.slice(1).map((line) => {
		const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
		// console.log(values);
		const record: Record<string, string> = {};
		headers.forEach((header, index) => {
			if (
				![
					2, 4, 5, 6, 7, 8, 11, 15, 16, 18, 19, 20, 21, 22, 23, 28,
					29, 30, 31, 32, 34, 35, 36,
				].includes(index)
			) {
				// console.log(header, values[index]);
				record[header.trim().replace(/^"|"$/g, "")] = values[index]
					.trim()
					.replace(/^"|"$/g, ""); // Remove leading and trailing quotes if any
			}
		});
		return record;
	});
}
