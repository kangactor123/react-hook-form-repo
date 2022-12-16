import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};
