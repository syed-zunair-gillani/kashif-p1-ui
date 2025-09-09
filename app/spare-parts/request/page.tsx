"use client";

import NavTabs from "@/components/nav-tabs";
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
        <NavTabs tabItems={tabItems} defaultActiveTab="Spare part request" />
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
                  className={`px-0 py-4 font-medium flex gap-1 sm:gap-3 items-center ${isActive
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

const tabItems = [
  {
    label: "My bookings",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 10H3M21 12.5V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22H12M16 2V6M8 2V6M14.5 19L16.5 21L21 16.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Spare part request",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 7H17V17H7V7Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 3L21 21" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Profile info",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];