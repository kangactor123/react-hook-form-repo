import { TControl } from "common/type";
import React from "react";
import { FieldValues, useController } from "react-hook-form";

type IInputTextProps<T extends FieldValues> = TControl<T> & {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ControlInputText<T extends FieldValues>({
  control,
  rules,
  name,
  ...props
}: IInputTextProps<T>) {
  const {
    field: { value, onChange: controlChange },
    fieldState: { isDirty, isTouched, error },
  } = useController({ name, rules, control });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange instanceof Function) {
      props.onChange(event);
    }

    controlChange(event);
  };
  return <input value={value} onChange={handleChange} />;
}

export default ControlInputText;
