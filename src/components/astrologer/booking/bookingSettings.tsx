const BookingSettings = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="border-b">
          <div className="flex flex-wrap -mb-px">
            <button className="inline-flex items-center px-4 py-2 border-b-2 border-purple-500 text-sm font-medium text-purple-600">
              Booking Settings
            </button>
            <button className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Cooling-Off Period
            </button>
            <button className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Feedback System
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium">Booking Preferences</h2>
              <p className="text-sm text-gray-500">Configure how your booking system works</p>
            </div>
            <div className="px-6 pb-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-Accept Bookings</h3>
                    <p className="text-sm text-gray-500">Automatically accept new bookings without notification</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Booking Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email notifications for new bookings</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Booking Time Slots</h3>
                <p className="text-sm text-gray-500">Configure your default session duration</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Session Duration</label>
                    <select className="w-full rounded-md border px-3 py-2">
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60" selected>
                        60 minutes
                      </option>
                      <option value="90">90 minutes</option>
                      <option value="120">120 minutes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Buffer Between Sessions</label>
                    <select className="w-full rounded-md border px-3 py-2">
                      <option value="0">No buffer</option>
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="15" selected>
                        15 minutes
                      </option>
                      <option value="30">30 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 pt-0">
              <button className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="hidden space-y-4">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium">Cooling-Off Period Settings</h2>
              <p className="text-sm text-gray-500">
                Set a minimum time before a session when bookings are no longer accepted
              </p>
            </div>
            <div className="px-6 pb-6 space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Enable Cooling-Off Period</h3>
                <p className="text-sm text-gray-500">Prevent last-minute bookings by setting a cooling-off period</p>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                  <label htmlFor="cooling-toggle" className="text-sm font-medium">
                    Enable cooling-off period
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Cooling-Off Duration</h3>
                <p className="text-sm text-gray-500">Select how much advance notice you need before a session</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preset Durations</label>
                    <select className="w-full rounded-md border px-3 py-2">
                      <option value="6">6 hours</option>
                      <option value="12">12 hours</option>
                      <option value="18">18 hours</option>
                      <option value="24" selected>
                        24 hours
                      </option>
                      <option value="36">36 hours</option>
                      <option value="48">48 hours</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Hours</label>
                    <input type="number" className="w-full rounded-md border px-3 py-2" placeholder="Enter hours" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Exceptions</h3>
                <p className="text-sm text-gray-500">Configure exceptions to your cooling-off period</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="vip-exception" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="vip-exception" className="text-sm font-medium">
                      Allow VIP clients to bypass cooling-off period
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="manual-exception" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="manual-exception" className="text-sm font-medium">
                      Allow manual override for specific cases
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 pt-0">
              <button className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="hidden space-y-4">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium">Feedback System Settings</h2>
              <p className="text-sm text-gray-500">Configure the feedback options for your clients</p>
            </div>
            <div className="px-6 pb-6 space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Enable Feedback Collection</h3>
                <p className="text-sm text-gray-500">Automatically request feedback after completed sessions</p>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                  <label htmlFor="feedback-toggle" className="text-sm font-medium">
                    Enable feedback collection
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Feedback Timing</h3>
                <p className="text-sm text-gray-500">When to send feedback requests to clients</p>
                <select className="w-full rounded-md border px-3 py-2">
                  <option value="immediately" selected>
                    Immediately after session
                  </option>
                  <option value="1hour">1 hour after session</option>
                  <option value="6hours">6 hours after session</option>
                  <option value="24hours">24 hours after session</option>
                </select>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Feedback Questions</h3>
                  <p className="text-sm text-gray-500">Manage the questions asked in your feedback form</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span>How was the clarity of the reading?</span>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span>Was the astrologer helpful?</span>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <span>Would you recommend this service?</span>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50">
                    Add New Question
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 pt-0">
              <button className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BookingSettings
