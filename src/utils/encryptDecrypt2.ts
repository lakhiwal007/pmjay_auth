// const CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js";

export class BISEncypt {
	// Generate SHA-256 Hash
	getSHA256Hash(password: any) {
		return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
	}

	// AES Encryption
	encrypt(password: any, data: any) {
		// Generate SHA-256 key
		let key = this.getSHA256Hash(password);
		let keyHex = CryptoJS.enc.Hex.parse(key);
		let encrypted = CryptoJS.AES.encrypt(data, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		return encrypted.toString();
	}

	// AES Decryption
	decrypt(password: any, encryptedData: any) {
		let key = this.getSHA256Hash(password);
		let keyHex = CryptoJS.enc.Hex.parse(key);
		let decrypted = CryptoJS.AES.decrypt(encryptedData, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	}
}

export const bisEncrypt = new BISEncypt();
