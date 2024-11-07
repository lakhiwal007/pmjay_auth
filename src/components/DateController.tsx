"use client";
import React from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
const DateController = ({
	name,
	error,
	control,
	formatDate = "DD MMMM, YYYY",
	placeholder = "Date",
	showError = true,
	disable = false,
}: any) => {
	return (
		<>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<div className="flex flex-col">
						<Popover>
							<div>
								<PopoverTrigger asChild>
									<button
										disabled={disable}
										className={`w-full flex items-center disabled:bg-[rgb(244,244,242)] ${
											error !== undefined &&
											"border-orange-600"
										}  p-2 border-[1.9px] border-gray-300 focus:border-2 focus:border-sky-500 rounded-[5px] outline-none`}
									>
										{field.value ? (
											dayjs(field.value).format(
												formatDate
											)
										) : (
											<span>{placeholder}</span>
										)}
										<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
									</button>
								</PopoverTrigger>
							</div>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									mode="single"
									selected={field.value}
									onSelect={field.onChange}
									disabled={(date) =>
										date > new Date() ||
										date < new Date("1900-01-01")
									}
									captionLayout="dropdown-buttons"
									fromYear={1930}
									toYear={new Date().getFullYear()}
								/>
							</PopoverContent>
						</Popover>
					</div>
				)}
			/>
			{error && showError && <p className="text-orange-600">{error}</p>}
		</>
	);
};

export default DateController;
