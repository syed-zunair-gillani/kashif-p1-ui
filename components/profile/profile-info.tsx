import React, { useState } from "react";
import AddNewVehicle from "../modelsbox/add-new-vehicle";
import EditVehicle from "../modelsbox/edit-vehicle";
import DeleteVehicle from "../modelsbox/delete-vehicle";
import AccountDetails from "./account-details";
import SecurityDetails from "./security-details";
import ModalBox from "../model-box";

const ProfileInfo = () => {
  const [activeTab, setActiveTab] = useState("My Cars");
  const [openModal, setOpenModal] = useState<null | "add" | "edit" | "delete">(
    null
  );
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const handleOpenModal = (type: "add" | "edit" | "delete", car?: any) => {
    setSelectedCar(car || null);
    setOpenModal(type);
  };

  return (
    <>
      {/* Section Title */}
      <section className="max-w-[1120px] mx-auto px-4 mb-8">
        <h2 className="text-[#3F72AF] text-3xl md:text-5xl font-semibold">
          {"Profile info"}
        </h2>
        <p className="text-[#ADB5BD] text-xl md:text-[20px] mt-2">
          Everything about your profile
        </p>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 mb-8">
        <div className="flex gap-3 sm:gap-0 max-w-[1120px] mx-auto px-4">
          {["My Cars", "Account details", "Security details"].map((tab) => (
            <button
              key={tab}
              className={`sm:px-[26px] px-0 py-4 font-medium flex gap-1 sm:gap-3 items-center ${
                activeTab === tab
                  ? "text-gray-700 border-b-2 border-gray-700"
                  : "text-gray-300 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <img
                src={
                  tab === "My Cars"
                    ? "/icons/car-01.svg"
                    : tab === "Account details"
                    ? "/icons/user-edit.svg"
                    : "/icons/shield-zap.svg"
                }
                width={24}
              />
              {tab}
            </button>
          ))}
        </div>
      </section>
      

      <section className="max-w-[1120px] mx-auto px-4 mb-8 pb-20">
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "My Cars" && (
            <div>
              <div className="flex items-center gap-10 mb-6">
                <p className="text-gray-600">Cars</p>
                <button
                  className="flex items-center gap-2 text-[#ADB5BD] font-medium"
                  onClick={() => handleOpenModal("add")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="#ADB5BD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add new
                </button>
              </div>

              <div className="gap-6 grid md:grid-cols-2">
                {[1, 2, 3].map((id) => {
                  const car = {
                    id,
                    name: "Mercedes-Maybach S 450",
                    plate: "10-AA-100",
                    vin: "41561246546465465567521",
                  };

                  return (
                    <div
                      key={id}
                      className="border border-[#E9ECEF]/50 bg-white rounded-lg p-6"
                    >
                      <h3 className="text-xl font-semibold mb-2 flex justify-between gap-5">
                        {car.name}
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleOpenModal("edit", car)}>
                            <img src={"/icons/edit-02.svg"} width={24} />
                          </button>
                          <button
                            onClick={() => handleOpenModal("delete", car)}
                          >
                            <img src={"/icons/x-close.svg"} width={24} />
                          </button>
                        </div>
                      </h3>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                          <p className="text-gray-400 min-w-[96px]">
                            Plate N°:
                          </p>
                          <p className="font-medium">{car.plate}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-gray-400 min-w-[96px]">VIN N°:</p>
                          <p className="font-medium">{car.vin}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "Account details" && <AccountDetails />}
          {activeTab === "Security details" && <SecurityDetails />}
        </div>

        {/* Modals */}
        {openModal === "add" && (
          <ModalBox
            open={true}
            onOpenChange={() => setOpenModal(null)}
            title="Add New Vehicle"
            maxWidth="520px"
          >
            <AddNewVehicle onclose={() => setOpenModal(null)} />
          </ModalBox>
        )}

        {openModal === "edit" && selectedCar && (
          <ModalBox
            open={true}
            onOpenChange={() => setOpenModal(null)}
            title="Edit Vehicle"
            maxWidth="520px"
          >
            <EditVehicle car={selectedCar} onclose={() => setOpenModal(null)} />
          </ModalBox>
        )}

        {openModal === "delete" && selectedCar && (
          <ModalBox
            open={true}
            onOpenChange={() => setOpenModal(null)}
            title="Delete Vehicle"
            maxWidth="520px"
          >
            <DeleteVehicle
              car={selectedCar}
              onclose={() => setOpenModal(null)}
            />
          </ModalBox>
        )}
      </section>
    </>
  );
};

export default ProfileInfo;
