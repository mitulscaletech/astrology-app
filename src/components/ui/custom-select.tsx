import React, { useEffect, useState } from "react";
import Select, { GroupBase, Props as SelectProps, components } from "react-select";

import "@/assets/scss/select.scss";
import IconArrowDropdown from "@/shared/icons/arrow-dropdown";

interface OptionType {
  value: string;
  label: string;
}

type CustomSelectProps = SelectProps<OptionType, boolean, GroupBase<OptionType>> & {
  label?: string;
  isMulti: boolean;
  error?: string;
  parentClass?: string;
  isFloatingLabel?: boolean;
  size?: "sm";
};

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <span className="text-secondary size-6">
      <IconArrowDropdown />
    </span>
  </components.DropdownIndicator>
);

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  isMulti = false,
  isFloatingLabel = true,
  error,
  parentClass,
  size,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (selectedOption: any) => {
    setHasValue(!!selectedOption);
    if (props?.onChange) {
      props.onChange(selectedOption, { action: "select-option", option: selectedOption });
    }
  };

  useEffect(() => {
    if (Object.keys(props?.value || {})?.length) {
      setHasValue(!!props.value);
    }
  }, [props?.value]);

  return (
    <div
      className={`${isFloatingLabel ? "floating-label-select" : ""} relative ${isFocused || hasValue ? "focused" : ""} ${parentClass || ""}`}
    >
      {label && (
        <label
          className={`custom-lable absolute pointer-events-none top-1/2 start-3.5 z-2 duration-300 transform ${isFocused ? "text-secondary" : "text-secondary/50"} ${isFocused || hasValue ? "-translate-y-full md:-translate-y-[125%] text-xs" : "-translate-y-1/2 text-base"}`}
        >
          {label}
        </label>
      )}
      <Select
        {...props}
        isMulti={isMulti}
        className={`custom-select-container size-${size}`}
        classNamePrefix="custom-select"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder=""
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
