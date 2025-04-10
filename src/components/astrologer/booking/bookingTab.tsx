"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { name: "Calendar", href: "/astrologer/booking" },
  { name: "Bookings", href: "/astrologer/booking/booking-list" },
  { name: "Settings", href: "/astrologer/booking/settings" },
  { name: "History", href: "/astrologer/booking/history" }
]

const BookingTab = () => {
  const pathname = usePathname()

  return (
    <div className="space-y-4 mb-3">
      <div className="border-b border-secondary-200">
        <div className="flex flex-wrap -mb-px">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href // Use exact match only
            const linkClasses = `inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${isActive ? "text-primary-600 border-primary" : "text-secondary-300 border-transparent hover:text-secondary-700 hover:border-secondary-300"}`

            return (
              <Link key={tab.name} href={tab.href} className={linkClasses}>
                {tab.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BookingTab
