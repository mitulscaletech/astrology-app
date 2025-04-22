import Link from "next/link";

export default function BookingsList() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h1 className="text-2xl font-bold mb-2">Booking Management</h1>
          <p className="text-sm text-gray-500">View and manage all your bookings</p>
          <div className="mt-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center justify-center rounded-md border border-secondary-200 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-secondary-100">
                    All
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md border border-secondary-200 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-secondary-100">
                    Pending
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md border border-secondary-200 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-secondary-100">
                    Confirmed
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md border border-secondary-200 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-secondary-100">
                    Completed
                  </button>
                </div>
                <button className="inline-flex items-center justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
                  Export
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <BookingItem name="Sarah Johnson" date="Apr 10, 2025" time="10:00 AM" status="pending" />
                <BookingItem name="Michael Chen" date="Apr 10, 2025" time="2:30 PM" status="confirmed" />
                <BookingItem name="Emily Rodriguez" date="Apr 11, 2025" time="11:15 AM" status="confirmed" />
                <BookingItem name="David Kim" date="Apr 12, 2025" time="4:00 PM" status="pending" />
                <BookingItem name="Jessica Taylor" date="Apr 13, 2025" time="1:30 PM" status="confirmed" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingItem({
  name,
  date,
  time,
  status
}: {
  name: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-secondary-200 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-secondary-400">
          {date} at {time}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`rounded-full px-2 py-1 text-xs ${
            status === "pending"
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
        <Link href={`/bookings/${name.toLowerCase().replace(" ", "-")}`}>
          <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            View
          </button>
        </Link>
        {status === "pending" && (
          <>
            <button className="inline-flex items-center justify-center rounded-md border border-gray-200 px-2.5 py-1.5 text-sm font-medium text-green-600 shadow-sm hover:bg-gray-50">
              Accept
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-gray-200 px-2.5 py-1.5 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50">
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}
