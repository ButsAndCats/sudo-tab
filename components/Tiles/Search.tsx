import * as React from "react";
import { SettingsSchema } from "../../types";
import { isLightColor } from "../../utils/utils";
import * as Icons from "../../icons/Icons";
import { TextInput } from "../SettingsForm/TextInput";

export const defaultSchema: SearchSchema = {
  type: "Search",
  hex: `#${Math.floor(Math.random()*16777215).toString(16)}`,
}

export const schema: Array<SettingsSchema> = [
  {
    type: "header",
    id: "type"
  },
  {
    type: "hex",
    id: "hex",
    label: "Colour",
  },
]

export const Search: React.FC<Props> = ({ hex }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${isLightColor(hex) ? "text-black" : "text-white"}`}
      style={{
        backgroundColor: hex
      }}
    >
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const { elements } = formRef.current as HTMLFormElement;
          const input = elements[0] as HTMLInputElement;
          const { value } = input;
          window.location.href = value.includes(".") ? `https://${value}` : `https://google.com/search?q=$value}`;
        }}
      >
        <input type="text" name="search" placeholder="Search" autoFocus className="rounded-full text-gray" />
      </form>
    </div>
  )
}

type Props = SearchSchema

export type SearchSchema = {
  type: "Search"
  hex: string
}