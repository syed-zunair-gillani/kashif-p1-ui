import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SecurityDetails = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // Handle form submission logic here (validation, API call, etc.)
  };

  const inputStyle =
    "bg-white p-4 border border-[#E9ECEF] rounded-[12px] w-full pr-12 outline-none focus:outline focus:outline-gray-400 active:outline active:outline-gray-400";
  const labelStyle = "block text-sm mb-3 text-[#495057]";
  const inputWrapperStyle = "relative";

  return (
    <section>
      <form className="grid grid-cols-3 gap-x-4 gap-y-8" onSubmit={handleSubmit}>
        {/* Old Password */}
        <div>
          <label className={labelStyle}>Old Password *</label>
          <div className={inputWrapperStyle}>
            <input
              className={inputStyle}
              placeholder="**********"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className={labelStyle}>New Password *</label>
          <div className={inputWrapperStyle}>
            <input
              className={inputStyle}
              placeholder="**********"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className={labelStyle}>Retype New Password *</label>
          <div className={inputWrapperStyle}>
            <input
              className={inputStyle}
              placeholder="**********"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-3">
          <input
            type="submit"
            value="Save changes"
            className="py-3 px-6 bg-[#3F72AF] rounded-[12px] text-white hover:bg-blue-500 cursor-pointer"
          />
        </div>
      </form>
    </section>
  );
};

export default SecurityDetails;
