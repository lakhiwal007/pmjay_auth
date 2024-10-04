"use client";
import React, { useEffect, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextController from "./TextController";
import { AdharSchema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import RadioController from "./RadioController";
import { GenderRadio } from "@/utils/constants";
import DateController from "./DateController";
import QrReader from "./QRScan";
const HomeComponent = () => {
	const {
		control,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "all",
		defaultValues: {
			gender: "",
		},
		resolver: yupResolver(AdharSchema),
	});

	const onSubmit = (data: FieldValues) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-[450px] space-y-4 px-4 py-2 flex flex-col items-center justify-center mx-auto border-2 rounded shadow-lg"
		>
			<QrReader setValue={setValue} />
			<div className="w-full">
				<p>
					Name
					<span className="text-orange-600">*</span>
				</p>
				<TextController
					name="name"
					control={control}
					error={errors.name?.message}
					maxLength={50}
				/>
			</div>
			<div className="w-full">
				<p>
					Gender<span className="text-orange-600">*</span>
				</p>
				<RadioController
					name={"gender"}
					control={control}
					error={errors.gender?.message}
					data={GenderRadio}
				/>
			</div>
			<div className="w-full">
				<p>
					Date of Birth<span className="text-orange-600">*</span>
				</p>
				<DateController
					name={"dob"}
					error={errors.dob?.message}
					control={control}
				/>
			</div>
			<div className="w-full">
				<p>
					Address
					<span className="text-orange-600">*</span>
				</p>
				<TextController
					name="address"
					control={control}
					error={errors.address?.message}
					maxLength={50}
				/>
			</div>
			<div className="w-full flex items-center space-x-4">
				<button
					type="button"
					onClick={() => {
						reset();
					}}
					className="bg-slate-200 shadow-md px-4 py-2 rounded border-[1px]  active:shadow-none"
				>
					Reset
				</button>
				<button
					type="submit"
					className="bg-orange-700 shadow-md px-4 py-2 rounded text-white active:shadow-none"
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default HomeComponent;
