import React from "react";
import { MdArrowDropDown, MdPerson, MdWifi, MdWifiOff } from "react-icons/md";
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
import { useNetworkConnectivity } from "@/hooks/useNetworkConnectivity";
type Props = {
	username: string;
};
const Header = ({ username }: Props) => {
	const router = useRouter();
	const isConnected = useNetworkConnectivity({});

	return (
		<div className="w-full flex shadow-sm rounded px-2 py-4 justify-between items-center">
			<Image src={LOGO} width={100} height={100} alt="logo" />
			<div className="relative flex items-center space-x-2">
				<div className="relative flex">
					<p className="font-bold truncate max-w-24">{username}</p>
					<p
						className={`w-4 h-4 p-[2px] rounded-full shadow-lg flex items-center justify-center text-white ${
							isConnected ? "bg-green-600" : "bg-red-700"
						}`}
					>
						{isConnected ? <MdWifi /> : <MdWifiOff />}
					</p>
				</div>

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
						<DropdownMenuItem
							onClick={() => {
								localStorage.removeItem("userId");
								localStorage.removeItem("username");
								router.replace("/");
							}}
						>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default Header;
