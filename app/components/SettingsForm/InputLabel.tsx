import * as React from "react";

export const InputLabel: React.FC<Props> = ({ name, label }) => (
  <label className="block mb-1 font-medium text-white" htmlFor={name}>
    {label}
  </label>
);

type Props = {
  name: string
  label: string
}