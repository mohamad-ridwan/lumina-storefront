"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Selects } from "@/types/selects";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  placeholder?: string;
  options: Selects[];
  isActiveSelectedToParams?: boolean;
  toParams?: "sort";
  defaultValue?: string;
  currentValue?: string;
}

export function BaseSelect({
  placeholder = "Options",
  options,
  isActiveSelectedToParams,
  toParams,
  defaultValue,
  currentValue,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    if (isActiveSelectedToParams && currentValue !== value) {
      router.replace(`${pathname}?${toParams}=${value}`);
    }
  };

  return (
    <Select onValueChange={onSelectChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-fit rounded-full cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt, i) => {
            return (
              <React.Fragment key={i}>
                {opt.type === "label" ? (
                  <SelectLabel>{opt.name}</SelectLabel>
                ) : opt.type === "item" ? (
                  <SelectItem value={opt.value} className="cursor-pointer">
                    {opt.name}
                  </SelectItem>
                ) : (
                  <SelectItem value="no-item" className="cursor-pointer">
                    No item
                  </SelectItem>
                )}
              </React.Fragment>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
