"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextController from "./TextController";
import { LoginSchema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LOGO from "../../public/icons/pmjay_logo-512.png";
import { ADHAR_TYPE, LoginType } from "@/utils/types";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Login = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: "all",
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: yupResolver(LoginSchema),
	});
	const router = useRouter();
	const [isLoading, setisLoading] = useState(false);

	useEffect(() => {
		const userId = localStorage.getItem("userId") || "";
		if (userId) {
			router.replace("/dashboard");
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

	const onSubmit = async (data: LoginType) => {
		// window.navigator.vibrate(200);
		setisLoading(true);
		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const res = await response.json();
			if (response.ok) {
				// console.log("res:", res);
				localStorage.setItem("userId", res.user.id);
				localStorage.setItem("username", res.user.username);
				toast.success(res.message);
				setisLoading(false);
				router.push("/dashboard");
			} else {
				toast.error(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-[450px] min-h-screen flex flex-col items-center justify-center mx-auto"
		>
			<div className="w-full space-y-4 p-4 flex flex-col items-center justify-center mx-auto rounded shadow-sm">
				<div>
					<Image
						src={LOGO}
						width={200}
						height={200}
						className="rounded-full shadow-md"
						alt="logo"
					/>
				</div>
				<div className="w-full">
					<p className="font-semibold">
						Username
						<span className="text-orange-600">*</span>
					</p>
					<TextController
						name="username"
						control={control}
						error={errors.username?.message}
						maxLength={50}
					/>
				</div>

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
				<div className="w-full flex items-center">
					<button
						disabled={isSubmitting}
						type="submit"
						className="w-full  tracking-wider bg-orange-700 shadow-md px-4 py-2 rounded text-white active:shadow-none"
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
