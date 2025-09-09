"use client"
import BookingTable from '@/components/booking/my-booking-table';
import NavTabs from '@/components/nav-tabs';
import React, { useState } from 'react'

const MyBooking = () => {

    const [activeTab, setActiveTab] = useState<TabStatus>("Upcoming");

    const tabCounts = statuses.reduce((acc, status) => {
        acc[status] = bookingsData.filter((b) => b.status === status).length;
        return acc;
    }, {} as Record<TabStatus, number>);

    const filteredBookings = bookingsData.filter(
        (booking) => booking.status === activeTab
    );


    return (
        <div className="bg-gray-50 pb-20">
            <section className="max-w-[1120px] mx-auto px-4 py-8">
                <NavTabs tabItems={tabItems} />
            </section>

            {/* Section Title & Filters */}
            <section className="max-w-[1120px] mx-auto px-4 mb-8">
                <h2 className="text-[#3F72AF] text-2xl md:text-[32px] font-semibold">
                    My Bookings
                </h2>
                <p className="text-[#ADB5BD] text-xl md:text-[20px] mt-2">
                    See your scheduled services from your calendar.
                </p>
            </section>


            {/* Tabs */}
            <section className="border-b border-gray-200 mb-8">
                <div className="flex gap-6 max-w-[1120px] mx-auto px-4 overflow-x-auto">
                    {statuses.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                className={`px-0 py-4 font-medium flex items-center gap-2 border-b-2 ${isActive
                                        ? "text-[#3F72AF] border-[#3F72AF]"
                                        : "text-[#ADB5BD] border-transparent hover:text-[#3F72AF]"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                <img
                                    src={
                                        tab === "Upcoming"
                                            ? "/icons/clock-fast-forward.svg"
                                            : tab === "Completed"
                                                ? "/icons/check-circle-broken.svg"
                                                : "/icons/delete.svg"
                                    }
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                                <span>{tab}</span>
                                <span className="px-2 py-[2px] text-xs border border-[#E9ECEF] rounded-2xl">
                                    {tabCounts[tab] ?? 0}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>
            {/* Table */}
            <BookingTable bookings={filteredBookings} />
        </div>
    )
}

export default MyBooking



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



const bookingsData = [
    {
        id: 1,
        status: "Upcoming",
        serviceCenter: "Performance Center",
        location: "Baku, Babek Ave 23.",
        date: "Sep 5, 2024",
        time: "15:00",
        carModel: "Mercedes Benz CL 65 AMG",
        plateNumber: "99-AA-999",
        serviceType: "Oil Change",
    },
    {
        id: 2,
        status: "Completed",
        serviceCenter: "Performance Center",
        location: "Baku, Babek Ave 23.",
        date: "Aug 20, 2024",
        time: "14:00",
        carModel: "Mercedes Benz CL 65 AMG",
        plateNumber: "99-AA-999",
        serviceType: "Oil Change",
    },
    {
        id: 3,
        status: "Cancelled",
        serviceCenter: "Performance Center",
        location: "Baku, Babek Ave 23.",
        date: "Jul 10, 2024",
        time: "10:00",
        carModel: "Mercedes Benz CL 65 AMG",
        plateNumber: "99-AA-999",
        serviceType: "Oil Change",
    },
];

const statuses = ["Upcoming", "Completed", "Cancelled"] as const;
type TabStatus = typeof statuses[number];
