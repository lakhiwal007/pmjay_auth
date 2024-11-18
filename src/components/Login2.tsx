"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextController from "./TextController";
import { LoginSchema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LOGO from "../../public/icons/pmjay_logo-512.png";
import { ADHAR_TYPE } from "@/utils/types";
import toast from "react-hot-toast";
import Loader from "./Loader";
import SelectInput from "./SelectInput";
import { AUTHMODE, BASE64_IMG, TOKEN } from "@/utils/constants";
import {
	CaptchaCheckAPI,
	DecryptAPI,
	GenerateCaptchaAPI,
	GenerateTokenAPI,
	GenSecondCaptchaAPI,
	ResendCaptchaAPI,
	ValidateAPI,
} from "@/utils/BIS_APIs/genearteToken";
import { MdClose, MdRotateRight } from "react-icons/md";
import { aesUtil } from "@/utils/encryptDecrypt1";
import { bisEncrypt } from "@/utils/encryptDecrypt2";

const Login = ({ setisLoginModal, setUsername }: any) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		watch,
		setValue,
	} = useForm({
		mode: "all",
		defaultValues: {
			captcha: "",
			captcha2: "",
			userid: "",
			authMode: "",
			otp: "",
			password: "",
		},
		resolver: yupResolver(LoginSchema),
	});
	const router = useRouter();
	const [isLoading, setisLoading] = useState(false);
	const watchAuthMode = watch("authMode");
	const watchLoginId = watch("userid");
	const watchCaptcha = watch("captcha");
	const watchCaptcha2 = watch("captcha2");
	const watchPasswd = watch("password") || "";

	const [token, settoken] = useState("");
	const [imgSRC, setimgSRC] = useState(BASE64_IMG);
	const [imgSRC2, setimgSRC2] = useState(BASE64_IMG);
	const [captchaID, setcaptchaID] = useState("");
	const [captchaID2, setcaptchaID2] = useState("");
	const [transactionID, setTransactionID] = useState("");
	const [AuthToken, setAuthToken] = useState("");
	const [UserId, setUserId] = useState("");

	const [isVerified, setisVerified] = useState(false);

	useEffect(() => {
		const GenToken = async () => {
			const response = await GenerateTokenAPI();
			const res = await response.text();
			// console.log(res);
			if (response.ok) {
				if (res.length > 7) {
					settoken(res);
				}
			}
		};
		GenToken();
	}, []);

	useEffect(() => {
		if (token) {
			const GenCaptcha = async () => {
				// console.log("token", token);
				const response = await GenerateCaptchaAPI(token);
				const res = await response.json();
				// console.log("res", res);
				if (response.ok) {
					if (res.captcha !== null) {
						setimgSRC(res.captcha);
						setcaptchaID(res.transactionid);
						// console.log(res.transactionid);
					}
				}
			};
			GenCaptcha();
		}
	}, [token]);
	// init API - afte thwe check , after the auth method seldction , in payload used_id = from the check api response
	const CaptchaCheck = async (captchaID: string) => {
		// console.log(watchCaptcha);
		const encryptCaptcha = aesUtil.encrypt(captchaID, watchCaptcha);

		try {
			const response = await CaptchaCheckAPI(
				token,
				watchLoginId,
				encryptCaptcha,
				captchaID
			);
			const res = await response.json();
			if (response.ok) {
				// console.log(res);
				setUserId(res.userid);
				setisVerified(true);
				const authWatch =
					res.defaultAuthMode === 16 ? "Password" : "Mobile_OTP";
				setValue("authMode", String(res.defaultAuthMode), {
					shouldValidate: true,
					shouldDirty: true,
					shouldTouch: true,
				});
				InitAPI(token, res.userid, authWatch);
			} else if (response.status === 400) {
				toast.error(res?.error?.message);
				setimgSRC(res.captcha);
				setcaptchaID(res.correlation_id);
			}
		} catch (error) {
			toast.error("Something Went Wrong.");
		}
	};

	const InitAPI = async (
		token: string,
		UserId: string,
		watchAuthMode: string
	) => {
		try {
			// console.log("UserId", UserId, "watchAuthMode", watchAuthMode);
			const response = await GenSecondCaptchaAPI(
				token,
				UserId,
				watchAuthMode
			);
			const res = await response.json();
			if (response.ok) {
				const captchaDecrypt = aesUtil.decrypt(
					res.transactionid,
					res.captcha
				);
				// console.log("captchaDecrypt", captchaDecrypt);
				setimgSRC2(captchaDecrypt);
				setUserId(res.userid);
				setcaptchaID2(res.transactionid);
			}
		} catch (error) {
			toast.error("Something Went Wrong.");
		}
	};

	useEffect(() => {
		const userId = localStorage.getItem("userId") || "";
		if (userId) {
			router.replace("/");
		}
	}, [router]);

	useEffect(() => {
		const NotSyncedData: ADHAR_TYPE[] = [];
		if (localStorage.getItem("notSyncedData") === null) {
			localStorage.setItem(
				"notSyncedData",
				JSON.stringify(NotSyncedData)
			);
		}
	}, []);

	const decryptAPI = async (
		token: string,
		transactionid: string,
		authtoken: string
	) => {
		const decryptAPIResponse = await DecryptAPI(
			token,
			transactionid,
			authtoken
		);
		// console.log("Calling Decrypt API", decryptAPI);
		if (decryptAPIResponse.ok) {
			const decryptRes = await decryptAPIResponse.text();
			// console.log(decryptRes);
			const decryptData = bisEncrypt.decrypt(
				process.env.NEXT_PUBLIC_IDAM_KEY,
				decryptRes
			);
			const DecryptJsonData = JSON.parse(decryptData);
			// console.log(DecryptJsonData);
			localStorage.setItem("username", DecryptJsonData.username);
			localStorage.setItem("userid", DecryptJsonData.userid);
			setUsername(DecryptJsonData.username);
			setisLoginModal(false);
			toast.success("You are logged in");
		}
	};

	const onSubmit = async (data: FieldValues) => {
		try {
			const encryptCaptcha2 = aesUtil.encrypt(captchaID2, watchCaptcha2);
			const encryptPasswd = aesUtil.encrypt(captchaID2, watchPasswd);
			const response = await ValidateAPI(
				token,
				captchaID2,
				encryptCaptcha2,
				encryptPasswd
			);
			const res = await response.json();
			// console.log(res);
			if (response.ok) {
				setTransactionID(res.transactionid);
				setAuthToken(res.authtoken);
				localStorage.setItem("authToken", res.authtoken);
				localStorage.setItem("transactionId", res.transactionid);
				// console.log("Validate API is OK", res);
				decryptAPI(token, res.transactionid, res.authtoken);
			} else if (response.status === 400) {
				toast.error(res?.error?.message);
			}
		} catch (error) {
			toast.error("Something Went Wrong.");
		}
	};

	const handleCaptcha = async () => {
		const response = await GenerateCaptchaAPI(token);
		// const res = await GenerateTokenAPI();
		const res = await response.json();
		if (response.ok) {
			setimgSRC(res.captcha);
			setcaptchaID(res.transactionid);
		}
	};
	const handleCaptcha2 = async () => {
		const response = await ResendCaptchaAPI(token, captchaID2);
		// const res = await GenerateTokenAPI();
		const res = await response.json();
		if (response.ok) {
			const captchaDecrypt = aesUtil.decrypt(
				res.transactionid,
				res.captcha
			);
			setimgSRC2(captchaDecrypt);
			setcaptchaID2(res.transactionid);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-[450px] flex flex-col items-start justify-center mx-auto bg-white rounded"
		>
			<div className="w-full space-y-4 p-4 flex flex-col items-start justify-center mx-auto rounded shadow-sm">
				<div className="w-full flex items-center justify-between">
					<p className="text-xl">Login</p>
					<button
						onClick={() => setisLoginModal(false)}
						type="button"
					>
						<MdClose className="w-8 h-8 rounded-full bg-slate-200 p-2 active:bg-stone-300" />
					</button>
				</div>
				<div className="w-full">
					<p className="font-semibold">
						Captcha
						<span className="text-orange-600">*</span>
					</p>
					<div className="w-full flex items-center space-x-2">
						<TextController
							name="captcha"
							control={control}
							error={errors.captcha?.message}
							maxLength={6}
						/>
						<Image
							height={100}
							width={140}
							src={`data:image/png;base64, ${imgSRC}`}
							alt="captcha1"
							className="w-32 h-auto"
						/>
						<button
							onClick={handleCaptcha}
							className="p-[11px] border-[1px] rounded"
							type="button"
						>
							<MdRotateRight />
						</button>
					</div>
				</div>
				<div className="w-full">
					<p className="font-semibold">
						Registered Mobile No/User ID{" "}
						<span className="text-orange-600">*</span>
					</p>
					<div className="w-full flex items-center relative">
						<TextController
							name="userid"
							control={control}
							error={errors.userid?.message}
							maxLength={10}
						/>
						<button
							className="absolute text-slate-500 bg-slate-100 px-2 py-[5px] border-[1px] rounded active:bg-slate-200 top-auto right-1 text-md"
							type="button"
							onClick={() => CaptchaCheck(captchaID)}
						>
							VERIFY
						</button>
					</div>
				</div>

				<div className="w-full">
					<p className="font-semibold">
						Authentication Mode
						<span className="text-orange-600">*</span>
					</p>
					<SelectInput
						name="authMode"
						control={control}
						error={errors.authMode?.message}
						OptionList={AUTHMODE}
					/>
				</div>

				{watchAuthMode === "56" && (
					<div className="w-full">
						<p className="font-semibold">
							OTP
							<span className="text-orange-600">*</span>
						</p>
						<TextController
							name="tel"
							control={control}
							error={errors.password?.message}
							maxLength={50}
							type="password"
						/>
					</div>
				)}

				{watchAuthMode === "16" && (
					<div className="w-full">
						<p className="font-semibold">
							Password
							<span className="text-orange-600">*</span>
						</p>
						<TextController
							name="password"
							control={control}
							error={errors.password?.message}
							maxLength={50}
							type="password"
						/>
					</div>
				)}

				{isVerified && (
					<div className="w-full">
						<p className="font-semibold">
							Captcha
							<span className="text-orange-600">*</span>
						</p>
						<div className="w-full flex items-center space-x-2">
							<TextController
								name="captcha2"
								control={control}
								error={errors.captcha2?.message}
								maxLength={6}
							/>
							<Image
								height={100}
								width={140}
								src={`data:image/png;base64, ${imgSRC2}`}
								alt="captcha1"
								className="w-32 h-auto "
							/>
							<button
								onClick={handleCaptcha2}
								className="p-2 border-2 rounded"
								type="button"
							>
								<MdRotateRight />
							</button>
						</div>
					</div>
				)}
				<div className="w-full flex items-center">
					<button
						disabled={isSubmitting || !isValid}
						type="submit"
						className="w-full  tracking-wider bg-orange-700 shadow-md px-4 py-2 rounded text-white active:shadow-none disabled:cursor-not-allowed"
					>
						Login
					</button>
				</div>
			</div>
			{isLoading && <Loader />}
		</form>
	);
};

export default Login;
