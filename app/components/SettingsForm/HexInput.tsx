import * as React from "react";
import { SketchPicker } from "react-color";
import { SettingsSchema } from "../../types";
import { InputLabel } from "./InputLabel";

export const HexInput: React.FC<Props> = ({ label, value, id }) => {
  const [val, setVal] = React.useState<string>(value);

  return (
    <>
      <InputLabel label={label} name={id} />
      <input
        value={val}
        name={id}
        type="text"
        className="hidden"
      />
      <SketchPicker color={val} onChange={(c) => {
        setVal(c.hex);
      }} />
    </>
  )
}

type Props = SettingsSchema.Color & {
  value: string
}