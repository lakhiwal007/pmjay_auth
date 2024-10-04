import * as yup from "yup";
const TEXT_REG = /^[a-zA-Z0-9.,'() \-_/&]*$/;
const TEXT_MSG = "Allowed special charcters are (),-_/.'&";

const TextYup = ({ len, msg }: { len: number; msg: string }) =>
	yup
		.string()
		.required("Required*")
		.matches(TEXT_REG, TEXT_MSG)
		.min(len, msg);

const DateYup = yup
	.date()
	.required("Required*")
	.typeError("Enter a valid date");

export const AdharSchema = yup.object().shape({
	name: TextYup({ len: 3, msg: "Required" }),
	address: TextYup({ len: 3, msg: "Required" }),
	dob: DateYup,
	gender: yup.string().oneOf(["M", "F", "O"]).required("Required*"),
});
