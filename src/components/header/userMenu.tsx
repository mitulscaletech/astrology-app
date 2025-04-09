"use client"
import React, { useState } from "react";
import logoIcon from "@/assets/images/logo-icon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const UserMenu = () => {
	const [userOpen, setUserOpen] = useState(false);

	return (
		<div className="relative">
			<Button
				onClick={() => setUserOpen((prev) => !prev)}
				className="flex items-center gap-2"
			>
				<span className="size-6 rounded-full bg-accent-white overflow-hidden">
					<Image src={logoIcon} alt="logo" width={24} height={24} />
				</span>
				<span className="hidden sm:inline">Astrologer</span>
			</Button>
			{userOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-accent-white text-black rounded-xl shadow-lg overflow-hidden z-10">
					<ul>
						<li className="px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer">
							Profile
						</li>
						<li className="px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer">
							Booking
						</li>
						<li className="px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer">
							Logout
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
