import React from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

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
