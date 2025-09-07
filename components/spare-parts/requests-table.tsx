import React from "react";

const SparePartsTable = ({ services = [], activeTab = "car" }: any) => {
  return (
    <div className="w-full max-w-[1120px] mx-auto px-4 pb-20">
      {services.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No {activeTab.toLowerCase()} services found.
        </div>
      ) : (
        <div className="rounded-3xl border border-[#E9ECEF] overflow-hidden">
          <table className="w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-[#F8F9FA] text-left text-xs text-[#ADB5BD]">
              <tr>
                <th className="px-4 py-3 w-[110px] break-words">Date</th>
                <th className="px-4 py-3 w-[150px] break-words">
                  Service & Location
                </th>
                <th className="px-4 py-3 w-[190px] break-words">VIN / Plate</th>
                <th className="px-4 py-3 w-[120px] break-words">Car part</th>
                <th className="px-4 py-3 w-[100px] break-words">State</th>
                <th className="px-4 py-3 w-[100px] break-words">Spare parts</th>
                <th className="px-4 py-3 w-[110px] break-words">Action</th>
                <th className="px-4 py-3 w-[140px] break-words">Review</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-[#495057] text-sm">
              {services.map((service: any, index: number) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 break-words">{service.date}</td>
                  <td className="px-4 py-4 font-medium break-words">
                    <img
                      src="/request-img.png"
                      width={20}
                      className="inline-block mr-2"
                    />
                    {service.carModel}
                  </td>
                  <td className="px-4 py-4 break-words">
                    {service.vinNumber || service.plateNumber}
                  </td>
                  <td className="px-4 py-4 break-words">
                    {service.requiredPart}
                  </td>
                  <td className="px-4 py-4">New</td>
                  <td className="px-4 py-4">
                    <button className="py-1.5 px-3 bg-[#F8FBFF] border rounded-[8px] text-[#3F72AF] font-semibold text-xs">
                      View
                    </button>
                  </td>
                  <td className="px-4 py-4">+994 55 995 47 65</td>
                  <td className="px-4 py-4 break-words">
                    <div className="flex flex-col items-start justify-between gap-2">
                      <span className="text-gray-500 text-xs">
                        Not reviewed yet.
                      </span>
                      <button className="text-[#3F72AF] block text-sm font-semibold">
                        Review it
                      </button>
                    </div>
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

export default SparePartsTable;
