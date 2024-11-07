import * as yup from "yup";
const TEXT_REG = /^[a-zA-Z0-9.,'() \-_/&?:]*$/;
const TEXT_MSG = "Allowed special charcters are (),-_/.'&?:";

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
	adhar_number: TextYup({
		len: 12,
		msg: "Enter valid aadhar number.",
	}).matches(/^[0-9]*$/, "Enter valid aadhar number."),
	name: TextYup({ len: 3, msg: "Min 3 characters allowed" }),
	address: TextYup({ len: 3, msg: "Min 3 characters allowed" }),
	dob: DateYup,
	gender: yup.string().required("Required*").default("M"),
});

export const LoginSchema = yup.object().shape({
	username: TextYup({ len: 6, msg: "Min 6 characters allowed" }),
	password: yup
		.string()
		.required("Required*")
		.min(6, "Minimum 6 characters allowed*"),
});
