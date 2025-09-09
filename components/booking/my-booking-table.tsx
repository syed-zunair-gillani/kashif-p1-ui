import React from "react";

const BookingTable = ({ bookings = [] }: { bookings: any[] }) => {
  return (
    <div className="w-full max-w-[1120px] mx-auto px-4 pb-20">
      {bookings.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E9ECEF] overflow-hidden">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-[#F8F9FA] text-xs text-[#ADB5BD] text-left">
              <tr>
                <th className="px-4 py-3 w-[200px]">Service & Location</th>
                <th className="px-4 py-3 w-[150px]">Reservation time</th>
                <th className="px-4 py-3 w-[200px]">Selected car & Number</th>
                <th className="px-4 py-3 w-[120px]">Service type</th>
                <th className="px-4 py-3 w-[180px]">Spare parts asked by service</th>
                <th className="px-4 py-3 w-[40px] text-right"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#495057] divide-y divide-gray-200">
              {bookings.map((booking, idx) => (
                <tr
                  key={booking.id}
                  className={idx % 2 === 1 ? "bg-[#F8F9FA]" : ""}
                >
                  <td className="px-4 py-4">
                    <div className="flex flex-col font-medium">
                      <span className="font-medium break-words">
                        <img
                      src="/request-img.png"
                      width={20}
                      className="inline-block mr-2"
                    />
                        {booking.serviceCenter}</span>
                      <span className="text-[#454545] text-xs mt-1">{booking.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {booking.date}
                    <br />
                    {booking.time}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {booking.carModel}
                    <br />
                    {booking.plateNumber}
                  </td>
                  <td className="px-4 py-4">{booking.serviceType}</td>
                  <td className="px-4 py-4">
                    <button className="py-1.5 px-3 bg-[#F8FBFF] border rounded-lg text-[#3F72AF] font-semibold text-xs">
                      View / Search
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          stroke="#495057"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                          stroke="#495057"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                          stroke="#495057"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
