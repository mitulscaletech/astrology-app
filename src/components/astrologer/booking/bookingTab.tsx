import Link from "next/link"

const BookingTab = () => {
  return (
    <div className="space-y-4">
      <div className="border-b border-secondary-200">
        <div className="flex flex-wrap -mb-px">
          <Link
            href="/astrologer/booking"
            className="inline-flex items-center px-4 py-2 border-b-2 border-primary text-sm font-medium text-primary-600"
          >
            Calendar
          </Link>
          <Link
            href="/astrologer/booking/booking-list"
            className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-secondary-300 hover:text-secondary-700 hover:border-secondary-300"
          >
            Bookings
          </Link>
          <Link
            href="/astrologer/booking/settings"
            className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-secondary-300 hover:text-secondary-700 hover:border-secondary-300"
          >
            Settings
          </Link>
          <Link
            href="/astrologer/booking/history"
            className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-secondary-300 hover:text-secondary-700 hover:border-secondary-300"
          >
            History
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookingTab
