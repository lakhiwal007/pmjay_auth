const QrString = (QrText: string) => {
	// Extract values using regular expressions
	const uidMatch = QrText.match(/uid="([^"]+)"/);
	const nameMatch = QrText.match(/name="([^"]+)"/);
	const genderMatch = QrText.match(/gender="([^"]+)"/);
	const dobMatch = QrText.match(/dob="([^"]+)"/);
	const yobMatch = QrText.match(/yob="([^"]+)"/) || "";

	// Extract values using regular expressions
	const addrsMatch = QrText.match(/address="([^"]+)"/);
	const lmMatch = QrText.match(/lm="([^"]+)"/);
	const vtcMatch = QrText.match(/vtc="([^"]+)"/);
	const poMatch = QrText.match(/po="([^"]+)"/);
	const distMatch = QrText.match(/dist="([^"]+)"/);
	const subdistMatch = QrText.match(/subdist="([^"]+)"/);
	const stateMatch = QrText.match(/state="([^"]+)"/);
	const pcMatch = QrText.match(/pc="([^"]+)"/);

	// Assign values to variables
	const addrs = addrsMatch ? addrsMatch[1] : "";
	const lm = lmMatch ? lmMatch[1] : "";
	const vtc = vtcMatch ? vtcMatch[1] : "";
	const po = poMatch ? poMatch[1] : "";
	const dist = distMatch ? distMatch[1] : "";
	const subdist = subdistMatch ? subdistMatch[1] : "";
	const state = stateMatch ? stateMatch[1] : "";
	const pc = pcMatch ? pcMatch[1] : "";

	// Assign values to variables
	const uid = uidMatch ? uidMatch[1] : null;
	const name = nameMatch ? nameMatch[1] : null;
	const gender = genderMatch ? genderMatch[1] : null;
	const dob = dobMatch ? dobMatch[1] : yobMatch[1];

	let _dob: Date = new Date();
	if (dobMatch && dob.includes("/")) {
		const [day, month, year] = dob.split("/");
		// console.log(Number(year), Number(month) - 1, Number(day));
		_dob = new Date(Number(year), Number(month) - 1, Number(day));
	} else if (dobMatch && dob.includes("-")) {
		const [year, month, day] = dob.split("-");
		// console.log(Number(year), Number(month) - 1, Number(day));
		_dob = new Date(Number(year), Number(month) - 1, Number(day));
	} else {
		_dob = new Date(Number(dob), 0, 1);
	}

	// Combine into an address string
	let address = [
		lm, // landmark
		vtc, // village/town/city
		po, // post office
		subdist, // sub-district
		dist, // district
		state, // state
		pc, // postal code
	]
		.filter(Boolean) // Filters out any falsy values (e.g., empty strings, null, undefined)
		.join(", ");
	if (address[0] === ",") {
		const addrs = address.split(", ").splice(1).join(",");
		address = addrs;
	}
	if (address === "") {
		address = addrs;
	}
	return {
		uid: uid ? uid : "",
		name: name ? name : "",
		gender: gender ? gender : "",
		dob: dob ? _dob : null,
		address: address ? address : "",
	};
};

export default QrString;
