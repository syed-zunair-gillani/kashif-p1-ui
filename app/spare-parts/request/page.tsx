"use client";

import MyBookings from "@/components/profile/my-booking";
import ProfileInfo from "@/components/profile/profile-info";
import SparePartsTable from "@/components/spare-parts/requests-table";
import { useState } from "react";

type TabStatus = "Accepted offers" | "Accepted requests" | "Pending";

interface SparePartRequest {
  id: number;
  date: string;
  carModel: string;
  plateNumber: string;
  vinNumber: string;
  requiredPart: string;
  status: TabStatus;
  price?: string;
  supplier?: string;
}

const SparePartsRequest = () => {
  const [activeModule, setActiveModule] = useState<
    "My bookings" | "Spare part request" | "Profile info"
  >("Spare part request");

  const [activeTab, setActiveTab] = useState<TabStatus>("Accepted offers");
  const [selectedPart, setSelectedPart] = useState<string>("All");

  const sparePartRequests: SparePartRequest[] = [
    {
      id: 1,
      date: "20.12.2024, 14:30",
      carModel: "Mercedes Benz CL 65 AMG",
      plateNumber: "99-AA-999",
      vinNumber: "WDDNG76X57A123456",
      requiredPart: "Engine Oil Filter",
      status: "Accepted offers",
      price: "$120",
      supplier: "AutoParts Inc.",
    },
    {
      id: 2,
      date: "21.12.2024, 10:15",
      carModel: "BMW X5",
      plateNumber: "88-BB-888",
      vinNumber: "5UXKR6C58L0X12345",
      requiredPart: "Brake Pads Set",
      status: "Accepted requests",
      price: "$230",
      supplier: "CarParts Direct",
    },
    {
      id: 3,
      date: "22.12.2024, 16:45",
      carModel: "Audi A4",
      plateNumber: "77-CC-777",
      vinNumber: "WAUZZFEX8AD123456",
      requiredPart: "Spark Plugs (4 pcs)",
      status: "Pending",
    },
    {
      id: 4,
      date: "23.12.2024, 09:30",
      carModel: "Volkswagen Golf",
      plateNumber: "66-DD-666",
      vinNumber: "WVWZZZ1KZ8W123456",
      requiredPart: "Timing Belt Kit",
      status: "Accepted offers",
      price: "$310",
      supplier: "EuroParts Ltd.",
    },
    {
      id: 5,
      date: "24.12.2024, 11:00",
      carModel: "Toyota Camry",
      plateNumber: "55-EE-555",
      vinNumber: "4T1BF1FK8JU123456",
      requiredPart: "Air Filter",
      status: "Accepted requests",
      price: "$45",
      supplier: "JapanAuto Parts",
    },
    {
      id: 6,
      date: "25.12.2024, 14:20",
      carModel: "Honda Civic",
      plateNumber: "44-FF-444",
      vinNumber: "2HGFA1F59LH123456",
      requiredPart: "Transmission Fluid",
      status: "Pending",
    },
  ];

  const filteredRequests = sparePartRequests.filter((request) => {
    const matchesTab = request.status === activeTab;
    const matchesPart =
      selectedPart === "All" || request.requiredPart === selectedPart;
    return matchesTab && matchesPart;
  });

  const tabCounts: Record<TabStatus, number> = {
    "Accepted offers": sparePartRequests.filter(
      (r) => r.status === "Accepted offers"
    ).length,
    "Accepted requests": sparePartRequests.filter(
      (r) => r.status === "Accepted requests"
    ).length,
    Pending: sparePartRequests.filter((r) => r.status === "Pending").length,
  };

  const uniqueParts = Array.from(
    new Set(sparePartRequests.map((r) => r.requiredPart))
  );

  return (
    <div className="bg-gray-50 pb-20">
      {/* Top Navigation & Title */}
      <section className="max-w-[1120px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
          <div className="flex items-center gap-3">
            {/* Top buttons like My Bookings, Spare part request, etc. */}
            {/* Omitted here for brevity but include your existing buttons */}
          </div>
          {/* Log out button if needed */}
        </div>
      </section>

      {/* Section Title & Filters */}
      <section className="max-w-[1120px] mx-auto px-4 mb-8">
        <h2 className="text-[#3F72AF] text-2xl md:text-[32px] font-semibold">
          Spare part request
        </h2>
        <p className="text-[#ADB5BD] text-xl md:text-[20px] mt-2">
          See your scheduled services from your calendar.
        </p>

        {/* Filter Dropdown */}
        <div>
          <label className="block mt-6 text-sm text-[#495057]">
            Selected spare part
          </label>
          <div className="mt-3 flex gap-3">
            {/* Spare Part Dropdown */}
            <div className="relative">
              <select
                className="appearance-none bg-[#E9ECEF] min-w-[184px] py-2.5 px-4 pr-10 rounded-[8px] text-gray-700"
                value={selectedPart}
                onChange={(e) => setSelectedPart(e.target.value)}
              >
                <option value="All">All</option>
                {uniqueParts.map((part) => (
                  <option key={part} value={part}>
                    {part}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* VIN/Plate Number Placeholder Dropdown */}
            <div className="relative">
              <select className="appearance-none bg-[#E9ECEF] min-w-[224px] py-2.5 px-4 pr-10 rounded-[8px] text-gray-700">
                <option value="VIN / Plate number">VIN / Plate number</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 mb-8">
        <div className="flex gap-3 sm:gap-10 max-w-[1120px] mx-auto px-4">
          {(["Accepted offers", "Accepted requests", "Pending"] as TabStatus[]).map(
            (tab) => {
              const isActive = activeTab === tab;
              const borderColor =
                tab === "Accepted offers"
                  ? "border-blue-400"
                  : tab === "Accepted requests"
                  ? "border-green-400"
                  : "border-yellow-400";

              return (
                <button
                  key={tab}
                  className={`px-0 py-4 font-medium flex gap-1 sm:gap-3 items-center ${
                    isActive
                      ? `text-gray-700 border-b-2 ${borderColor}`
                      : "text-gray-300 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <img
                    src={
                      tab === "Accepted offers"
                        ? "/icons/clock-fast-forward.svg"
                        : tab === "Accepted requests"
                        ? "/icons/check-circle-broken.svg"
                        : "/icons/clock-refresh.svg"
                    }
                    width={24}
                    alt={`${tab} icon`}
                  />
                  <p>{tab}</p>
                  <span className="px-3 py-[2px] border border-[#E9ECEF] rounded-3xl">
                    {tabCounts[tab]}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </section>

      {/* Spare Parts Table */}
      <SparePartsTable services={filteredRequests} activeTab={activeTab} />
    </div>
  );
};

export default SparePartsRequest;
