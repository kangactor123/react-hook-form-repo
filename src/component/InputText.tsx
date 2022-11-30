import React from "react";

interface IInputTextProps {
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputText(props: IInputTextProps) {
  return <input value={props.value} onChange={props.onChange} />;
}

export default React.memo(InputText);
