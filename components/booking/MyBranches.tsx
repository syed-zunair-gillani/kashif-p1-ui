import React from "react";

const branches = [
  {
    title: "Shamakhi Branch",
    code: "123-9841024",
    manager: "Kamran Rustamli",
    address: "Bakı ş., Heydər Əliyev pr., 191",
    mapLink: "https://maps.google.com",
  },
  {
    title: "Shamakhi Branch",
    code: "123-9841024",
    manager: "Kamran Rustamli",
    address: "Bakı ş., Heydər Əliyev pr., 191",
    mapLink: "https://maps.google.com",
  },
  {
    title: "Shamakhi Branch",
    code: "123-9841024",
    manager: "Kamran Rustamli",
    address: "Bakı ş., Heydər Əliyev pr., 191",
    mapLink: "https://maps.google.com",
  },
  {
    title: "Shamakhi Branch",
    code: "123-9841024",
    manager: "Kamran Rustamli",
    address: "Bakı ş., Heydər Əliyev pr., 191",
    mapLink: "https://maps.google.com",
  },
];

const MyBranches = () => {
  return (
    <section className="pb-20">
      <div className="flex gap-6 text-sm items-center mb-6">
        <h2 className="text-gray-700 font-medium">Branches</h2>
        <button className="font-medium text-gray-400 hover:text-gray-700">+ Add new</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch, index) => (
          <div key={index} className="rounded-2xl bg-white p-6 relative">
            {/* 3-dots menu placeholder */}
            <div className="absolute top-4 right-4 cursor-pointer text-gray-400 text-xl">
              ⋮
            </div>

            <h3 className="text-[#3F72AF] font-medium text-lg mb-1">{branch.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{branch.code}</p>

            <p className="text-sm text-gray-400 mb-1">Branch manager</p>
            <p className="text-sm text-gray-700 mb-4">{branch.manager}</p>

            <p className="text-sm text-gray-400 mb-1">Address</p>
            <p className="text-sm text-gray-700">{branch.address}</p>
            <a
              href={branch.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#3F72AF] underline"
            >
              Google Map
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBranches