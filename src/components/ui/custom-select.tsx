import IconSort from "@/shared/icons/sort";
import React from "react";
import Select, { GroupBase, Props as SelectProps, components } from "react-select";
import "@/assets/scss/select.scss";

interface OptionType {
  value: string;
  label: string;
}

type CustomSelectProps = SelectProps<OptionType, false, GroupBase<OptionType>> & {
  label?: string;
};

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <span className="text-secondary">
      <IconSort />
    </span>
  </components.DropdownIndicator>
);

const CustomSelect: React.FC<CustomSelectProps> = ({ label, ...props }) => {
  return (
    <div className="w-full max-w-sm">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <Select
        {...props}
        className="custom-select-container"
        classNamePrefix="custom-select"
        components={{
          DropdownIndicator: DropdownIndicator,
          IndicatorSeparator: () => null
        }}
      />
    </div>
  );
};

export default CustomSelect;
