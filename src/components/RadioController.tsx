"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const RadioController = ({
	name,
	error,
	control,
	showError = true,
	disable = false,
	data,
}: any) => {
	return (
		<>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<div className="space-y-3 mt-1">
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex items-center"
							disabled={disable}
						>
							{data.map((e: any) => (
								<div
									key={e.value}
									className="flex items-center space-x-1 space-y-0 text-sm"
								>
									<RadioGroupItem
										id={e.value}
										value={e.value}
									/>
									<label htmlFor={e.value}>{e.label}</label>
								</div>
							))}
						</RadioGroup>
					</div>
				)}
			/>
			{error && showError && <p className="text-orange-600">{error}</p>}
		</>
	);
};

export default RadioController;
