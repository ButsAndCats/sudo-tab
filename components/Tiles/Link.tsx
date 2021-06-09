import * as React from "react";
import { SettingsSchema } from "../../types";
import { isLightColor } from "../../utils/utils";
import * as Icons from "../../icons/Icons";

export const defaultSchema: LinkSchema = {
  type: "Link",
  hex: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  url: "https://google.com",
  icon: "Settings"
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
    id: "url",
    label: "Link"
  },
  {
    type: "select",
    id: "icon",
    label: "Icon",
    options: Object.keys(Icons).map((i) => ({
      value: i,
      label: i
    }))
  }
]

export const Link: React.FC<Props> = ({ hex, url, icon }) => {
  return (
    <a
      href={url}
      className={`absolute inset-0 flex items-center justify-center ${isLightColor(hex) ? "text-black" : "text-white"}`}
      style={{
        backgroundColor: hex
      }}
    >
      <div>
        {Icons[icon]?.({})}
      </div>
    </a>
  )
}

type Props = LinkSchema

export type LinkSchema = {
  type: "Link"
  hex: string
  url: string
  icon: "Settings"
}