// Function to parse CSV and convert to JSON
export function csvToJson(csvData: string): any[] {
	const lines = csvData.trim().split("\n");
	const headers = lines[0].split(",");
	// console.log(headers);
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
