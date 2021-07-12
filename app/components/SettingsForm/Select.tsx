import * as React from "react";
import { SettingsSchema } from "../../types";
import { InputLabel } from "./InputLabel";

export const Select: React.FC<SettingsSchema.Select & { value: string }> = ({ label, options, id, value }) => {
  return (
    <>
      <InputLabel label={label} name={id} />
      <select
        className="form-select w-full rounded py-3 border border-blue px-4 text-black focus:shadow-lg focus:ring focus:ring-blue focus:outline-none"
        name={id}
        defaultValue={value}
      >
        {options?.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};