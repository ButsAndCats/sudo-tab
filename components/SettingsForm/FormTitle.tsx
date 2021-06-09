import * as React from "react";

export const FormTitle: React.FC<Props> = ({ value }) => (
  <h6 className="block mb-2 font-semibold text-white text-xl">
    {value}
  </h6>
);

type Props = {
  value: string
}