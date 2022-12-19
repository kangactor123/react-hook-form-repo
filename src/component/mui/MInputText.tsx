import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { TControl } from "common/type";
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
    fieldState: { isDirty, isTouched, error },
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
      InputProps={{
        sx: {
          border: `1px solid ${error ? "red" : "gray"}`, //간단한 에러
        },
      }}
      {...props}
    />
  );
}

export default MInputText;
