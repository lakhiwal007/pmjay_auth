import toast from "react-hot-toast";
import Papa from "papaparse";

// Function to parse CSV and convert to JSON
export function csvToJson(csvData: File): Promise<any[]> {
	const checkHead = [
		"card_no",
		"entity_id",
		"batch_id",
		"user_id",
		"state_cd",
		"district_cd",
		"subdistrict_town",
		"village_ward",
		"urban_or_rural",
		"card_name",
		"card_fathername",
		"card_relation",
		"card_yob",
		"card_gender",
		"card_address",
		"abha_no",
		"card_photo",
		"card_print_status",
		"enroll_date",
		"approve_date",
		"card_gen_date",
		"card_print_date",
		"card_distribute_date",
		"card_deliver_date",
		"ben_id",
		"aadhar_id",
		"family_id",
		"age",
		"source_type",
		"created_by",
		"created_dt",
		"updated_by",
		"updated_dt",
		"mobile_number",
		"operator_id",
		"operator_name",
		"operator_contact",
		"state_name",
		"district_name",
		"sub_district_name",
		"village_name",
	];

	return new Promise((resolve, reject) => {
		Papa.parse(csvData, {
			header: true,
			worker: true,
			dynamicTyping: true,
			complete: function (results: any) {
				const headers = Object.keys(results.data[0]);
				const isValidHeader = checkHead.every(
					(header, index) => header === headers[index]
				);

				if (!isValidHeader) {
					// toast.error("Invalid CSV File.");
					// reject(new Error("Invalid CSV File."));
					resolve([]);
				}

				const columnsToRemove = [
					"batch_id",
					"entity_id",
					"state_cd",
					"district_cd",
					"subdistrict_town",
					"village_ward",
					"urban_or_rural",
					"abha_no",
					"card_photo",
					"card_print_status",
					"card_relation",
					"enroll_date",
					"approve_date",
					"card_gen_date",
					"card_print_date",
					"card_distribute_date",
					"card_deliver_date",
					"source_type",
					"created_by",
					"created_dt",
					"updated_by",
					"updated_dt",
					"mobile_number",
					"operator_id",
					"operator_name",
					"operator_contact",
					"state_name",
					"district_name",
					"sub_district_name",
					"village_name",
				];

				const cleanedData = results.data.map((row: any) => {
					columnsToRemove.forEach((column) => delete row[column]);
					return row;
				});

				resolve(cleanedData);
			},
			error: function (error) {
				toast.error("Error parsing CSV.");
				reject(error);
			},
		});
	});
}
