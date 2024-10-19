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
import Link from "next/link";
type Props = {
	username: string;
};
const Header = ({ username }: Props) => {
	const router = useRouter();
	const isConnected = useNetworkConnectivity({});

	return (
		<div className="w-full flex shadow-sm rounded p-2 justify-between items-center">
			<Link href={"/dashboard"}>
				<Image
					src={LOGO}
					width={120}
					height={120}
					className="rounded-full shadow-sm"
					alt="logo"
				/>
			</Link>
			<div className="w-full relative flex items-center justify-end space-x-2">
				<p className="font-bold truncate max-w-24">{username}</p>

				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className=" relative flex items-center">
							<MdPerson className="w-8 h-8" />
							<p
								className={`w-4 h-4 p-[2px] absolute right-3 -top-2 rounded-full shadow-lg flex items-center justify-center text-white ${
									isConnected ? "bg-green-600" : "bg-red-700"
								}`}
							>
								{isConnected ? <MdWifi /> : <MdWifiOff />}
							</p>
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
