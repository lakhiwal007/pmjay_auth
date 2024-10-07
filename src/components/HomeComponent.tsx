"use client";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LOGO from "@/public/icons/pmjay_logo-512.png";
import QrReader from "./QRScan";
import Image from "next/image";
import { MdArrowDropDown, MdPerson } from "react-icons/md";
const HomeComponent = () => {
	return (
		<div className="max-w-[450px] min-h-screen flex flex-col items-center justify-start mx-auto">
			<div className="w-full flex shadow-sm rounded px-2 py-4 justify-between items-center">
				<Image src={LOGO} width={100} height={100} alt="logo" />
				<div className="flex items-center space-x-2">
					<p className="font-bold truncate max-w-24">Username</p>

					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className="flex items-center">
								<MdPerson className="w-8 h-8" />
								<MdArrowDropDown />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="w-full flex flex-col space-y-4 p-4 rounded shadow-sm">
				<QrReader />
			</div>
		</div>
	);
};

export default HomeComponent;
