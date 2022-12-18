import React, { ChangeEvent } from "react";
import {
  RadioGroupProps,
  FormControlLabelProps,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { TControl } from "common/type";
import { FieldValues, useController } from "react-hook-form";

export type TRadioGroup = Omit<FormControlLabelProps, "control">;

// 만약 props 가 더 필요하다면 아래 정의하면 됩니다.
type CustomSelectProps = {
  group: TRadioGroup[];
  size?: "medium" | "small";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type TProps<T extends FieldValues> = Omit<RadioGroupProps, "onChange"> &
  CustomSelectProps &
  TControl<T>;

function MRadio<T extends FieldValues>(props: TProps<T>) {
  const {
    name,
    rules,
    control,
    group,
    size = "medium",
    onChange: propsOnChange,
  } = props;
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules,
    control,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (propsOnChange) {
      propsOnChange(event);
    }
  };

  return (
    <FormControl>
      <RadioGroup row name={name} value={value} onChange={handleChange}>
        {group.map(({ value: radioValue, disabled, label }, index) => (
          <FormControlLabel
            key={index}
            value={radioValue}
            label={label}
            control={
              <Radio size={size} value={radioValue} disabled={disabled} />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default MRadio;
