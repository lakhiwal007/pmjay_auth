import React from "react";
import { Controller } from "react-hook-form";

const SelectInput = ({
	name,
	error,
	control,
	OptionList,
	disable = false,
}: any) => {
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
						disabled={disable}
						className={`w-full p-[9px] border-[1px] bg-transparent border-gray-300 rounded disabled:bg-[rgb(244,244,242)]`}
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
