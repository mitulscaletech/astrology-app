const BookingStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-3">
      {/* Total Bookings */}
      <div className="rounded-2xl border border-secondary-200 p-4 shadow-sm bg-white">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-primary">Total Bookings</h3>
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
            className="text-gray-500"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div className="text-2xl font-bold text-secondary">128</div>
        <p className="text-xs text-secondary-400">+14% from last month</p>
      </div>

      {/* Pending Bookings */}
      <div className="rounded-2xl border border-secondary-200 p-4 shadow-sm bg-white">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-primary">Pending Bookings</h3>
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
            className="text-gray-500"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div className="text-2xl font-bold text-secondary">12</div>
        <p className="text-xs text-secondary-400">Requires your attention</p>
      </div>

      {/* Today's Sessions */}
      <div className="rounded-2xl border border-secondary-200 p-4 shadow-sm bg-white">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-primary">Today&apos;s Sessions</h3>
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
            className="text-gray-500"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div className="text-2xl font-bold text-secondary">4</div>
        <p className="text-xs text-secondary-400">Next session in 2 hours</p>
      </div>

      {/* Completed Sessions */}
      <div className="rounded-2xl border border-secondary-200 p-4 shadow-sm bg-white">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-primary">Completed Sessions</h3>
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
            className="text-gray-500"
          >
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
        </div>
        <div className="text-2xl font-bold text-secondary">89</div>
        <p className="text-xs text-secondary-400">This month</p>
      </div>
    </div>
  );
};

export default BookingStats;
