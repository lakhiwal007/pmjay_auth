"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextController from "./TextController";
import { LoginSchema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LOGO from "@/public/icons/pmjay_logo-512.png";

const Login = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "all",
		resolver: yupResolver(LoginSchema),
	});
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	if (isLoggedIn) {
		router.replace("/dashboard");
	}

	const onSubmit = (data: FieldValues) => {
		console.log(data);
		router.push("/dashboard");
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-[450px] min-h-screen flex flex-col items-center justify-center mx-auto"
		>
			<div className="w-full space-y-4 p-4 flex flex-col items-center justify-center mx-auto rounded shadow-lg">
				<Image src={LOGO} width={200} height={200} alt="logo" />
				<div className="w-full">
					<p>
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
					<p>
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
						type="submit"
						className="bg-orange-700 shadow-md px-4 py-2 rounded text-white active:shadow-none"
					>
						Login
					</button>
				</div>
			</div>
		</form>
	);
};

export default Login;
