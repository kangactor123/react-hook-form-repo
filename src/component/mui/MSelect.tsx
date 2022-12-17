import React, { ReactNode } from "react";
import {
  Select,
  SelectProps,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { TControl } from "common/type";
import { FieldValues, useController } from "react-hook-form";

export interface ISelectItem {
  label: ReactNode;
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

// 만약 props 가 더 필요하다면 아래 정의하면 됩니다.
type CustomSelectProps<T> = {
  selectList: ISelectItem[];
  placeholder: string;
  size?: "small" | "medium" | "large";
  onChange?: (event: SelectChangeEvent<T>) => void;
};

type TProps<T extends FieldValues> = Omit<
  SelectProps,
  "onChange" | "placeholder"
> &
  CustomSelectProps<T> &
  TControl<T>;

function MSelect<T extends FieldValues>(props: TProps<T>) {
  const {
    name,
    rules,
    control,
    selectList,
    placeholder,
    onChange: propsOnChange,
  } = props;
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    rules,
    control,
  });

  const handleChange = (event: SelectChangeEvent<T>) => {
    onChange(event);
    if (propsOnChange) {
      propsOnChange(event);
    }
  };

  const renderValue = () =>
    value
      ? selectList.find((item) => item.value === value)?.label
      : placeholder;

  return (
    <Select
      value={value}
      renderValue={renderValue}
      onChange={handleChange}
      onBlur={onBlur}
    >
      {selectList.map(({ label, value, disabled }, index) => (
        <MenuItem key={index} value={value} disabled={disabled ?? false}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default MSelect;
