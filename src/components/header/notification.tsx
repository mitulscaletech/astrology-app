"use client"
import React, { useState } from "react";
import IconNotification from "@/shared/icons/notification"

const demoNotifications = [
	{
		id: 1,
		title: "New Booking Request",
		time: "2 mins ago"
	},
	{
		id: 2,
		title: "Profile Viewed by User123",
		time: "10 mins ago"
	},
	{
		id: 3,
		title: "Session Completed",
		time: "1 hour ago"
	}
];

const Notification = () => {
	const [isNotification, setIsNotification] = useState(false);

	return (
		<div className="relative">
			<button
				onClick={() => setIsNotification((prev) => !prev)}
				className="block hover:text-secondary"
			>
				<span className="w-5 h-5">
					<IconNotification />
				</span>
			</button>

			{isNotification && (
				<div className="absolute right-0 mt-2 w-72 max-h-80 bg-accent-white text-black rounded-xl shadow-lg p-4 z-10 overflow-y-auto space-y-3">
					{demoNotifications.length > 0 ? (
						demoNotifications.map((notification) => (
							<div
								key={notification.id}
								className="text-sm border-b last:border-0 border-secondary-100 pb-2 last:pb-0"
							>
								<p className="font-medium text-secondary">{notification.title}</p>
								<p className="text-xs text-secondary-300">{notification.time}</p>
							</div>
						))
					) : (
						<p className="text-sm">No new notifications</p>
					)}
				</div>
			)}
		</div>

	);
};

export default Notification;
