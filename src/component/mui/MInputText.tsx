import { TextField, TextFieldProps } from "@mui/material";
import { TControl } from "common/type";
import React from "react";
import { FieldValues, useController } from "react-hook-form";

type TProps<T extends FieldValues> = TextFieldProps & TControl<T>;

function MInputText<T extends FieldValues>({
  name,
  rules,
  control,
  ...props
}: TProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules,
    control,
  });

  return (
    <TextField
      value={value}
      onChange={onChange}
      inputProps={{
        maxLength: 255,
      }}
      {...props}
    />
  );
}

export default MInputText;
