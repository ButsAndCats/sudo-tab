import * as React from "react";
import { SettingsSchema } from "../../types";
import { InputLabel } from "./InputLabel";

export const TextInput: React.FC<Props> = ({ label, value, id }) => {
  const [val, setVal] = React.useState<string>(value);
  return (
    <>
      <InputLabel label={label} name={id} />
      <input
        value={val}
        name={id}
        onChange={(e) => setVal(e.target.value)}
        type="text"
        className={`border-blue focus:ring-blue w-full rounded py-3 px-4 text-black focus:shadow-lg focus:ring focus:outline-none`}
      />
    </>
  )
}

type Props = SettingsSchema.Text & {
  value: string
}