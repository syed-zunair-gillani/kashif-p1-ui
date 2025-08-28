import CustomSelect, { CustomSelectItem } from "@/components/app-custom/custom-select";
import { SelectGroup } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface IServiceSelector {
  placeholder?: string;
  triggerClassname?: string;
  onChange?: (value: string) => void;
  value?: string;
}

interface Service {
  sparepartsId: number;
  sparepartsType: string;
}

export function ServiceSelector({
  placeholder = 'Select service',
  triggerClassname,
  onChange,
  value
}: IServiceSelector) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/spare-parts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch services");
        return res.json();
      })
      .then((data: Service[]) => {console.log("data:::=>", data); setServices(data)})
      .catch((err) => {
        console.error("Error fetching services:", err);
        setServices([]);
      });
  }, []);

  return (
    <CustomSelect
      value={value}
      onChange={(value) => onChange && onChange(value)}
      triggerClassname={cn(triggerClassname)}
      placeholder={placeholder}
    >
      <div className={'p-5 flex flex-col gap-y-3'}>
        <SelectGroup>
          {services.map((service) => (
            <CustomSelectItem key={service.sparepartsId} value={service.sparepartsId.toString()}>
              {service.sparepartsType}
            </CustomSelectItem>
          ))}
        </SelectGroup>
      </div>
    </CustomSelect>
  );
}
