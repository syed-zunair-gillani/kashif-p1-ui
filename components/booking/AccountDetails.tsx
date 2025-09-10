import React, { useState } from "react";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    taxId: "",
    contactName: "",
    role: "",
    city: "",
    address: "",
    phone: "",
    mobile: "",
    email: "",
    website: "",
  });

  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "cover") => {
    const file = e.target.files?.[0] || null;
    if (type === "logo") setCompanyLogo(file);
    else setCoverPhoto(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, companyLogo, coverPhoto });
    // TODO: handle actual file upload logic to server here
  };

  return (
    <section className="bg-gray-50 pb-20">
      <form className="grid grid-cols-3 gap-x-4 gap-y-8" onSubmit={handleSubmit}>
        {/* Text Fields */}
        <div>
          <label className="block mb-1 text-sm font-medium">Company name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Performance Center"
            className="w-full p-3 border rounded-[12px]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Tax ID *</label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            placeholder="2002002312"
            className="w-full p-3 border rounded-[12px]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Contact person’s full name *</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Kamran Rustamli"
            className="w-full p-3 border rounded-[12px]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Contact person’s role *</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Manager"
            className="w-full p-3 border rounded-[12px]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">City *</label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 pr-10 border rounded-[12px] appearance-none"
            >
              <option value="">Select city</option>
              <option value="Baku">Baku</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
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

        <div>
          <label className="block mb-1 text-sm font-medium">Address *</label>
          <div className="relative">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="28 May str. 32"
              className="w-full p-3 border rounded-[12px] pr-10"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
              <img src="/assets/icons/map.svg"/>
            </span>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Stasionar tel *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+994 12 333 33 33"
            className="w-full p-3 border rounded-[12px]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Mobile *</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+994 55 333 33 33"
            className="w-full p-3 border rounded-[12px]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">E-mail address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="performance.center@gmail.com"
            className="w-full p-3 border rounded-[12px]"
          />
        </div>

        <div className="col-span-3">
          <label className="block mb-1 text-sm font-medium">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Type your website"
            className="w-full p-3 border rounded-[12px]"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">Update company logo *</label>
          <div className="relative border p-4 rounded-[12px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gray-200 rounded-[12px] overflow-hidden">
                {companyLogo ? (
                  <img
                    src={URL.createObjectURL(companyLogo)}
                    alt="logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-sm">{companyLogo?.name || "No file selected"}</p>
                <p className="text-xs text-gray-500">
                  {companyLogo ? `${(companyLogo.size / 1024 / 1024).toFixed(2)} MB` : ""}
                </p>
              </div>
            </div>
            <label className="text-gray-500 cursor-pointer">
              🔄
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "logo")}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Cover Photo Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">Upload company cover photo *</label>
          <div className="relative border p-4 rounded-[12px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gray-200 rounded-[12px] overflow-hidden">
                {coverPhoto ? (
                  <img
                    src={URL.createObjectURL(coverPhoto)}
                    alt="cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-sm">{coverPhoto?.name || "No file selected"}</p>
                <p className="text-xs text-gray-500">
                  {coverPhoto ? `${(coverPhoto.size / 1024 / 1024).toFixed(2)} MB` : ""}
                </p>
              </div>
            </div>
            <label className="text-gray-500 cursor-pointer">
              🔄
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "cover")}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="col-span-3">
          <button
            type="submit"
            className="py-3 px-6 bg-[#3F72AF] rounded-[12px] text-white hover:bg-blue-600"
          >
            Save changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default AccountDetails;
