const BASE_URL = "https://apisbeta.nha.gov.in/pmjay/stgbis";
export const apiURLs = {
	genToken: `${BASE_URL}/configbis/bis/token/data`,
	genCaptcha: `${BASE_URL}/authService/bis/auth/generateCaptcha`,
	check: `${BASE_URL}/authService/bis/auth/V3/check`,
	init: `${BASE_URL}/authService/bis/auth/V3/init`,
	validate: `${BASE_URL}/authService/bis/auth/V3/validate`,
	decrypt: `${BASE_URL}/authService/bis/auth/V3/decrypt`,
	resendCaptcha: `${BASE_URL}/authService/bis/auth/V3/resendCaptcha`,
	logout: `${BASE_URL}/authService/bis/auth/audit/storeLoginLogoutDetails`,
	cardDelivery: `${BASE_URL}/carddeliverybis/api/bis/search/update/delivery/v2`,
};
