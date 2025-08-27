"use client"
import {memo, useEffect, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";

import ServiceRegistrationStep1 from "@/components/register/service-register/service-registration-step-1";
import ServiceRegistrationHeader from "@/components/register/service-register/service-registration-header";
import ServiceRegistrationBottomButtons from "@/components/register/service-register/service-registration-bottom-buttons";
import ServiceRegistrationStep2 from "@/components/register/service-register/service-registration-step-2";
import ServiceRegistrationStep3 from "@/components/register/service-register/service-registration-step-3";
import StoreRegistrationStep2 from "@/components/register/store-register/store-registration-step-2";

// ⬅️ ADDED: API endpoints
const API_UPLOAD    = "http://localhost:8081/api/upload";
const API_COMPANIES = "http://localhost:8081/api/companies";
const API_BRANCHES  = "http://localhost:8081/api/branches";

interface IStoreRegistrationFull {
  closeFormAndGoBack: () => void
  openPopup: () => void
}

function StoreRegistrationFull({closeFormAndGoBack, openPopup}: IStoreRegistrationFull) {

  const [step,setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const fileSchema = z
    .instanceof(File, {message: 'Not a valid file format!'})
    .refine((file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type), {
      message: "Only JPEG, JPG and PNG files are allowed",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    });

  const storeBranchInfoSchema = z.object({
    category: z.string({required_error: "Select the category"}),
    carBrands: z.array(z.string({required_error: "Select at least 1 car brand"}), {required_error: "Select at least 1 car brand"}).min(1, {message: "Select at least 1 car brand"}),
    state: z.array(z.string({required_error: 'state is required'}), {required_error: "state is required"}).min(1, {message: "Select at least 1 state"})
  })

  const storeBranchFormSchema = z.object({
    name: z.string({required_error: 'branch name is required'}).min(3, "branch name must be at least 3 characters"),
    code: z.string({required_error: 'branch code is required'}).min(3, "branch code must be at least 3 characters"),
    managerName: z.string({required_error: 'manager name is required'}).min(3, "manager name must be at least 3 characters"),
    managerSurname: z.string({required_error: 'manager surname is required'}).min(3, "manager surname must be at least 3 characters"),
    address: z.string({required_error: 'address is required'}).min(3, "address must be at least 3 characters"),
    location: z.string({required_error: 'location is required'}).min(3, "location must be at least 3 characters"),
    workDays: z.array(z.string({required_error: "Select work days"}), {required_error: "Select work days"}).min(1, {message: "Select at least 1 work day"}).max(7),
    workHours: z.array(z.string({required_error: "Select work hours"}), {required_error: "Select work hours"}).length(2, {message: "Select work hours"}),
    email: z.string({required_error: 'email is required'}).email('provide a valid email address'),
    password: z.string({required_error: 'password is required'}).min(8, 'password must be at least 8 characters'),
    repeatPassword: z.string({required_error: 'repeat password is required'}),
    logo: fileSchema,
    cover: fileSchema,
    info: z.array(storeBranchInfoSchema).min(1, {message: "Provide at least 1 info"})
  }).refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'], // This ensures the error is attached to the `repeatPassword` field
  }).refine((data) => data.workHours[0] < data.workHours[1], {
    message: "Start time must be before end time",
    path: ['workHours'],
  });

  const storeRegistrationFormSchema = z.object({
    companyName: z.string({required_error: 'company name is required'}).min(3, "company name must be at least 3 characters"),
    brandName: z.string({required_error: 'brand name is required'}).min(3, "brand name must be at least 3 characters"),
    taxId: z.string({required_error: 'tax id is required'}).min(3, "tax id must be at least 3 characters"),
    managerName: z.string({required_error: 'manager name is required'}).min(3, "manager name must be at least 3 characters"),
    managerSurname: z.string({required_error: 'manager surname is required'}).min(3, "manager surname must be at least 3 characters"),
    managerStationaryPhone: z.string({required_error: 'stationary phone is required'}).min(3, "stationary phone must be at least 3 characters"),
    managerMobileNumber: z.string({required_error: 'mobile number is required'}).min(3, "mobile number must be at least 3 characters"),
    email: z.string({required_error: 'email is required'}).email('provide a valid email address'),
    website: z.string({required_error: 'website is required'}).min(3, "website must be at least 3 characters"),
    password: z.string({required_error: 'password is required'}).min(8, 'password must be at least 8 characters'),
    repeatPassword: z.string({required_error: 'repeat password is required'}),
    tinPhoto: fileSchema,
    branches: z.array(storeBranchFormSchema).min(1)
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'], // This ensures the error is attached to the `repeatPassword` field
  });

  const form = useForm<z.infer<typeof storeRegistrationFormSchema>>({
    resolver: zodResolver(storeRegistrationFormSchema),
    defaultValues: {
      branches: [
        {
          info: [{}],
          workHours: [undefined, undefined],
          workDays: []
        }
      ]
    },
    mode: "onChange"
  })

  // ⬅️ ADDED: helpers
  function ts() {
    const d = new Date();
    const pad = (n:number)=>String(n).padStart(2,"0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
  }
  function stampedNameFromFile(file: File) {
    const dot = file.name.lastIndexOf('.');
    const base = dot > -1 ? file.name.substring(0, dot) : file.name;
    const ext  = dot > -1 ? file.name.substring(dot) : '';
    return `${base}-${ts()}${ext}`;
  }
  async function uploadToSpringUploadAPI(file: File, stampedName: string): Promise<string> {
    const fd = new FormData();
    fd.set("file", file);
    fd.set("filename", stampedName); // server will use this name
    const res = await fetch(API_UPLOAD, { method: "POST", body: fd });
    if (!res.ok) throw new Error(`Upload failed: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return data.filename as string;   // final stored filename (string)
  }
  function formatWorkHours(range: [string, string]) {
    const [start, end] = range;
    return `${start} - ${end}`;
  }
  function formatWorkDays(days: string[]) {
    return days.join(", ");
  }
  function extractCompanyId(payload: any): number {
    const keys = ["companyId","id","company_id","CompanyId"];
    for (const k of keys) if (payload && typeof payload[k] === "number") return payload[k];
    throw new Error("Could not determine companyId from response");
  }

  // ⬅️ UPDATED: real submit flow (upload images → send JSON with file names)
  async function onSubmit(values: z.infer<typeof storeRegistrationFormSchema>) {
    console.log(values);

    // 1) Upload company tinPhoto and get stamped filename
    const tin = values.tinPhoto as File;
    const tinStamped = stampedNameFromFile(tin);
    const tinFilename = await uploadToSpringUploadAPI(tin, tinStamped);

    // 2) Create company (JSON only; include tin filename)
    const companyPayload = {
      companyName: values.companyName,
      brandName: values.brandName,
      taxId: values.taxId,
      managerName: values.managerName,
      managerSurname: values.managerSurname,
      managerPhone: values.managerStationaryPhone,
      managerMobile: values.managerMobileNumber,
      managerEmail: values.email,
      website: values.website,
      password: values.password,
      tinPhoto: tinFilename
    };
    
    const companyRes = await fetch(API_COMPANIES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(companyPayload),
    });
    if (!companyRes.ok) {
      throw new Error(`Company create failed: ${companyRes.status} ${await companyRes.text()}`);
    }
    const companyJson = await companyRes.json().catch(()=> ({}));
    const companyId = extractCompanyId(companyJson);

    // 3) For each branch: upload images → send JSON with names only
    for (const b of values.branches) {
      const logo  = b.logo as File;
      const cover = b.cover as File;

      const logoStamped  = stampedNameFromFile(logo);
      const coverStamped = stampedNameFromFile(cover);

      const logoFilename  = await uploadToSpringUploadAPI(logo,  logoStamped);
      const coverFilename = await uploadToSpringUploadAPI(cover, coverStamped);

      const branchPayload = {
        companyId,
        branchName: b.name,
        branchCode: b.code,
        branchManagerName: b.managerName,
        branchManagerSurname: b.managerSurname,
        branchAddress: b.address,
        location: b.location,
        workdays: formatWorkDays(b.workDays),
        workingHours: formatWorkHours(b.workHours as [string, string]),
        loginEmail: b.email,
        password: b.password,
        logoImg: logoFilename,
        branchCoverImg: coverFilename
      };

      const branchRes = await fetch(API_BRANCHES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branchPayload),
      });
      if (!branchRes.ok) {
        throw new Error(`Branch create failed: ${branchRes.status} ${await branchRes.text()}`);
      }
    }

    // Success UX
    openPopup?.();
  }

  // ⬅️ UPDATED: hook up handleSubmit
  return (
    <div className={'pt-10 pb-20 mx-auto w-[806px] h-full flex flex-col gap-y-6'}>
      {/*Header*/}
      <ServiceRegistrationHeader step={step}/>

      {/*Full	Form with divided steps*/}
      <Form {...form}>
        <form className={'flex flex-col gap-y-5'} onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && <ServiceRegistrationStep1 type={"store"} form={form} />}
          {step === 2 && <StoreRegistrationStep2 form={form} />}
          {step === 3 && <ServiceRegistrationStep3 form={form} />}
          {/* ⬅️ ADDED: hidden submit so Enter works */}
          
          <div className="pt-6">

		        <button type="submit">Register Company & Branches</button>

		      </div>
        </form>
      </Form>

      {/*Bottom Buttons prev and next...*/}
      <ServiceRegistrationBottomButtons
        form={form}
        step={step}
        setStep={setStep}
        closeFormAndGoBack={closeFormAndGoBack}
        openPopup={openPopup}
      />

    </div>
  )
}

export default memo(StoreRegistrationFull)
