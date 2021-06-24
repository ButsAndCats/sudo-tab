import * as React from "react";
import { SettingsSchema } from "../../types";
import { isLightColor } from "../../utils/utils";

export const defaultSchema: StickySchema = {
  type: "Sticky",
  hex: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  text: "",
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
  {
    type: "text",
    id: "text",
    label: "Text",
  }
]

export const Sticky: React.FC<Props> = ({ hex, text }) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${isLightColor(hex) ? "text-black" : "text-white"} p-2`}
      style={{
        backgroundColor: hex
      }}
    >
      <p>{text}</p>
    </div>
  )
}

type Props = StickySchema

export type StickySchema = {
  type: "Sticky"
  hex: string
  text: string
}