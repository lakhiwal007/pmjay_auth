import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { aesUtil } from "../encryptDecrypt1";
import { apiURLs } from "../apiURL";
import { apiHeaders, encryptedGenToken } from "../constants";
import { bisEncrypt } from "../encryptDecrypt2";

const UUID = uuidv4();
const timeWithUUID = `${UUID}${moment().format("ddMMYYYYHHmmss")} `;

let data = aesUtil.encrypt(process.env.NEXT_PUBLIC_IDAM_KEY, timeWithUUID);

export const GenerateTokenAPI = async () => {
	// console.log("data", data);
	const response = await fetch(apiURLs.genToken, {
		method: "POST",
		headers: {
			// ...apiHeaders,
			"Content-Type": "text/plain",
			"Request-Agent": "web",
		},
		body: data,
	});

	return response;
};

export const GenerateCaptchaAPI = async (token: string) => {
	const response = await fetch(apiURLs.genCaptcha, {
		method: "POST",
		headers: {
			...apiHeaders,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({}),
	});

	return response;
};

export const ResendCaptchaAPI = async (
	token: string,
	transactionid: string
) => {
	const bodyData = {
		role: "user",
		transactionid,
	};
	const response = await fetch(apiURLs.resendCaptcha, {
		method: "POST",
		headers: {
			...apiHeaders,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(bodyData),
	});

	return response;
};

export const CaptchaCheckAPI = async (
	token: string,
	loginId: string,
	captcha: string,
	captchaId: string
) => {
	const bodyData = {
		role: "user",
		loginid: loginId,
		captcha,
		captchaId,
	};
	// console.log(bodyData);
	const response = await fetch(apiURLs.check, {
		method: "POST",
		headers: {
			...apiHeaders,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(bodyData),
	});

	return response;
};

export const GenSecondCaptchaAPI = async (
	token: string,
	userId: string,
	authMode: string
) => {
	const bodyData = {
		role: "user",
		userid: userId,
		authmode: authMode,
	};
	const response = await fetch(apiURLs.init, {
		method: "POST",
		headers: {
			...apiHeaders,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(bodyData),
	});

	return response;
};

export const ValidateAPI = async (
	token: string,
	transactionid: string,
	captcha: string,
	password: string
) => {
	const bodyData = {
		role: "user",
		transactionid,
		captcha,
		token: password,
		language: "English",
		authtransaction: null,
	};
	const response = await fetch(apiURLs.validate, {
		method: "POST",
		headers: {
			...apiHeaders,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(bodyData),
	});

	return response;
};

export const DecryptAPI = async (
	token: string,
	transactionId: string,
	authToken: string
) => {
	const bodyData = {
		role: "user",
		transactionId,
		authToken,
	};
	const encryptData = bisEncrypt.encrypt(
		process.env.NEXT_PUBLIC_IDAM_KEY,
		JSON.stringify(bodyData)
	);
	// console.log("encryptData", encryptData);
	const response = await fetch(apiURLs.decrypt, {
		method: "POST",
		headers: {
			...apiHeaders,
			Authorization: `Bearer ${token}`,
		},
		body: encryptData,
	});

	return response;
};

export const CardDeliveryAPI = async (
	token: string,
	programIds: string[],
	stateCd: string
) => {
	const bodyData = {
		programIds,
		stateCd,
		schemeCd: "PMJAY",
	};

	// console.log("encryptData", encryptData);
	const response = await fetch(apiURLs.cardDelivery, {
		method: "POST",
		headers: {
			...apiHeaders,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(bodyData),
	});

	return response;
};
