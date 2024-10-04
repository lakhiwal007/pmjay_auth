export const GenderRadio = [
	{ value: "M", label: "Male" },
	{ value: "F", label: "Female" },
	{ value: "O", label: "Other" },
];

export const QrText = String(
	'Scanned Result: <?xml version="1.0" encoding="UTF - 8"?> <PrintLetterBarcodeData uid="491773702372" name="Ankit Lakhiwal" gender="M" yob="2002" co="S / O Prabhu Dayal Lakhiwal" lm="goru balae ki dhani" vtc="Khorabeesal" po="Khora Bisal" dist="Jaipur" subdist="Amber" state="Rajasthan" pc="302012" dob="26 /04 / 2002"/>'
);

// Extract values using regular expressions
const nameMatch = QrText.match(/name="([^"]+)"/);
const genderMatch = QrText.match(/gender="([^"]+)"/);
const dobMatch = QrText.match(/dob="([^"]+)"/);

// Extract values using regular expressions
const lmMatch = QrText.match(/lm="([^"]+)"/);
const vtcMatch = QrText.match(/vtc="([^"]+)"/);
const poMatch = QrText.match(/po="([^"]+)"/);
const distMatch = QrText.match(/dist="([^"]+)"/);
const subdistMatch = QrText.match(/subdist="([^"]+)"/);
const stateMatch = QrText.match(/state="([^"]+)"/);
const pcMatch = QrText.match(/pc="([^"]+)"/);

// Assign values to variables
const lm = lmMatch ? lmMatch[1] : "";
const vtc = vtcMatch ? vtcMatch[1] : "";
const po = poMatch ? poMatch[1] : "";
const dist = distMatch ? distMatch[1] : "";
const subdist = subdistMatch ? subdistMatch[1] : "";
const state = stateMatch ? stateMatch[1] : "";
const pc = pcMatch ? pcMatch[1] : "";

// Assign values to variables
const name = nameMatch ? nameMatch[1] : null;
const gender = genderMatch ? genderMatch[1] : null;
const dob = dobMatch ? dobMatch[1] : null;
// Combine into an address string
const address = `${lm}, ${vtc}, ${po}, ${subdist}, ${dist}, ${state}, ${pc}`;

console.log("name", name);
console.log("gender", gender);
console.log("yob", dob);
console.log("address", address);
