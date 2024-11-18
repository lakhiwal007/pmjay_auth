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

const OptionalYup = (name: string) => {
	return yup.string().when(name, {
		is: (value: any) => value === "16",
		then: (schema) =>
			schema
				.required("Required*")
				.min(3, "Minimum 3 characters allowed.*")
				.max(20),
		otherwise: (schema) => schema.nullable(),
	});
};
const OptionalYup2 = (name: string) => {
	return yup.string().when(name, {
		is: (value: any) => value === "56",
		then: (schema) =>
			schema
				.required("Required*")
				.matches(TEXT_REG, TEXT_MSG)
				.min(3, "Minimum 3 characters allowed.*")
				.max(20),
		otherwise: (schema) => schema.nullable(),
	});
};

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
	captcha: TextYup({ len: 6, msg: "Invalid Captcha" }),
	captcha2: TextYup({ len: 6, msg: "Invalid Captcha" }),
	userid: yup.string().required("Required*"),
	authMode: yup.string().required("Required*"),
	otp: OptionalYup2("authMode"),
	password: OptionalYup("authMode"),
});
