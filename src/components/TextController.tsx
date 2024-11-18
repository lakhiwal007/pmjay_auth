"use client";
import React from "react";
import { Controller } from "react-hook-form";

const TextController = ({
	type = "text",
	control,
	name,
	error,
	disable = false,
	maxLength = 50,
	defaultValue = "",
	showError = true,
	isDecimal = false,
}: any) => {
	const handleKeyDown = (e: any) => {
		let isNumber = /^[0-9]$/;
		if (isDecimal) {
			isNumber = /^[0-9.]$/;
		}
		if (
			!isNumber.test(e.key) &&
			e.key !== "Backspace" &&
			e.key !== "Delete" &&
			e.key !== "ArrowLeft" &&
			e.key !== "ArrowRight" &&
			e.key !== "Tab"
		) {
			e.preventDefault();
		}
	};
	return (
		<div className="w-full flex flex-col">
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field }) => (
					<input
						{...field}
						type={
							type === "password"
								? "password"
								: type === "number"
								? "tel"
								: "text"
						}
						maxLength={maxLength}
						onKeyDown={(e) => type === "number" && handleKeyDown(e)}
						disabled={disable}
						className={`w-full disabled:bg-[rgb(244,244,242)] ${
							error !== undefined
								? "border-orange-600 focus-within:border-orange-600"
								: "focus-within:border-sky-500"
						}  p-2 border-[1.9px] border-gray-300 focus:border-2 rounded-[5px] outline-none`}
					/>
				)}
			/>
			{error && showError && <p className="text-orange-600">{error}</p>}
		</div>
	);
};

export default TextController;
