import React from "react";
import { Controller } from "react-hook-form";

const SelectInput = ({ name, error, control, OptionList }: any) => {
	return (
		<>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<select
						ref={field.ref}
						value={field.value}
						onChange={(selectedOption) => {
							field.onChange(selectedOption);
						}}
						className={`w-full p-[9px] border-[1px] bg-transparent border-gray-300 rounded`}
					>
						<option key={""} value={""}>
							Select...
						</option>
						{OptionList.map((e: any) => (
							<option key={e.value} value={e.value}>
								{e.label}
							</option>
						))}
					</select>
				)}
			/>
			{error && <p className="text-orange-600">{error}</p>}
		</>
	);
};

export default SelectInput;
