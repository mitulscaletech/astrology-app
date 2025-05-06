import IconSort from "@/shared/icons/sort";
import React from "react";
import Select, { GroupBase, Props as SelectProps, components } from "react-select";
import "@/assets/scss/select.scss";

interface OptionType {
  value: string;
  label: string;
}

type CustomSelectProps = SelectProps<OptionType, boolean, GroupBase<OptionType>> & {
  label?: string;
  isMulti: boolean;
  error?: string;
};

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <span className="text-secondary">
      <IconSort />
    </span>
  </components.DropdownIndicator>
);

const CustomSelect: React.FC<CustomSelectProps> = ({ label, isMulti = false, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-secondary-700">{label}</label>}
      <Select
        {...props}
        isMulti={isMulti}
        className="custom-select-container"
        classNamePrefix="custom-select"
        components={{
          DropdownIndicator: DropdownIndicator,
          IndicatorSeparator: () => null
        }}
      />
      {error && <p className="mt-0.5 ml-1 text-sm text-primary">{error}</p>}
    </div>
  );
};

export default CustomSelect;
