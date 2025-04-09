import Link from "next/link"

export default function BookingHistory() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Booking History</h1>
          <button className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
        </div>

        <div className="rounded-lg border bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-medium">Filters</h2>
            <p className="text-sm text-gray-500">Filter your booking history</p>
          </div>
          <div className="px-6 pb-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <select className="w-full rounded-md border px-3 py-2">
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select className="w-full rounded-md border px-3 py-2">
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Type</label>
                <select className="w-full rounded-md border px-3 py-2">
                  <option value="all">All Types</option>
                  <option value="natal">Natal Chart</option>
                  <option value="transit">Transit Reading</option>
                  <option value="compatibility">Compatibility</option>
                  <option value="career">Career Reading</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2.5 top-2.5 text-gray-500"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input className="w-full rounded-md border px-3 py-2 pl-8" placeholder="Search by name or email" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-medium">Booking Records</h2>
          <p className="text-sm text-gray-500">View all your past and upcoming bookings</p>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-6">
                <div className="font-medium sm:col-span-2">Client</div>
                <div className="font-medium">Date</div>
                <div className="font-medium">Time</div>
                <div className="font-medium">Status</div>
                <div className="font-medium text-right">Actions</div>
              </div>
              <div className="divide-y">
                <BookingHistoryItem
                  name="Sarah Johnson"
                  email="sarah.j@example.com"
                  date="Apr 10, 2025"
                  time="10:00 AM"
                  status="pending"
                />
                <BookingHistoryItem
                  name="Michael Chen"
                  email="michael.c@example.com"
                  date="Apr 8, 2025"
                  time="2:30 PM"
                  status="completed"
                />
                <BookingHistoryItem
                  name="Emily Rodriguez"
                  email="emily.r@example.com"
                  date="Apr 5, 2025"
                  time="11:15 AM"
                  status="cancelled"
                />
                <BookingHistoryItem
                  name="David Kim"
                  email="david.k@example.com"
                  date="Apr 3, 2025"
                  time="4:00 PM"
                  status="completed"
                />
                <BookingHistoryItem
                  name="Jessica Taylor"
                  email="jessica.t@example.com"
                  date="Mar 28, 2025"
                  time="1:30 PM"
                  status="completed"
                />
                <BookingHistoryItem
                  name="Robert Garcia"
                  email="robert.g@example.com"
                  date="Mar 25, 2025"
                  time="3:45 PM"
                  status="completed"
                />
                <BookingHistoryItem
                  name="Amanda Wilson"
                  email="amanda.w@example.com"
                  date="Mar 20, 2025"
                  time="9:30 AM"
                  status="completed"
                />
                <BookingHistoryItem
                  name="Thomas Brown"
                  email="thomas.b@example.com"
                  date="Mar 18, 2025"
                  time="2:00 PM"
                  status="completed"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Showing 8 of 128 bookings</div>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function BookingHistoryItem({
  name,
  email,
  date,
  time,
  status,
}: {
  name: string
  email: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-6">
      <div className="sm:col-span-2">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </div>
      <div>{date}</div>
      <div>{time}</div>
      <div>
        <div
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : status === "confirmed"
              ? "bg-green-100 text-green-800"
              : status === "completed"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Link href={`/bookings/${name.toLowerCase().replace(" ", "-")}`}>
          <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            View
          </button>
        </Link>
        <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Invoice
        </button>
      </div>
    </div>
  )
}
