import * as React from "react";
import { SettingsSchema } from "../../types";
import { InputLabel } from "./InputLabel";

export const Date: React.FC<Props> = ({ value, label, id, ...props}) => {
  const [val, setVal] = React.useState<string>(value);
  console.log(props)
  console.log(label)
  return (
    <>
      <InputLabel label={label} name={id} />
      <input
        value={val}
        name={id}
        onChange={(e) => setVal(e.target.value)}
        type="date"
        className={`border-blue focus:ring-blue w-full rounded py-3 px-4 text-black focus:shadow-lg focus:ring focus:outline-none`}
      />
    </>
  )
};

type Props = SettingsSchema.Date & {
  value: string
}