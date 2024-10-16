import React from "react";
import { MdArrowDropDown, MdPerson } from "react-icons/md";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LOGO from "../../public/icons/pmjay_logo-512.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
	const router = useRouter();
	return (
		<div className="w-full flex shadow-sm rounded px-2 py-4 justify-between items-center">
			<Image src={LOGO} width={100} height={100} alt="logo" />
			<div className="relative flex items-center space-x-2">
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
						<DropdownMenuItem onClick={() => router.replace("/")}>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default Header;
