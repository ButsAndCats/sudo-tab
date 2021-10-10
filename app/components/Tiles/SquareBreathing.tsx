import * as React from "react";
import { SettingsSchema } from "../../types";
import { isLightColor } from "../../utils/utils";
import * as Icons from "../icons/Icons";

const defaults: SquareBreathingSchema = {
  type: "SquareBreathing",
  hex: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  url: "https://google.com",
  icon: "Favicon",
  label: "",
}
export const defaultSchema: SquareBreathingSchema = Object.assign({}, defaults)

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

export const SquareBreathing: React.FC<Props> = ({ hex }) => {
  const [playing, setPlaying] = React.useState<boolean>(false);
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${isLightColor(hex) ? "text-black" : "text-white"}`}
      style={{
        backgroundColor: hex
      }}
      onClick={() => setPlaying((prev) => !prev)}
    >
      <div className={`h-20 w-20 relative rotate-animation ${playing ? "" : "stop"}`}>
        <div className={`w-20 h-20 absolute bg-opacity-30 ${isLightColor(hex) ? "bg-black" : "bg-white"}`}>
          <div className={`grow ${playing ? "" : "stop"} w-20 absolute bottom-0 bg-opacity-70 ${isLightColor(hex) ? "bg-black" : "bg-white"}`}>

          </div>
        </div>

        <p className="absolute w-full text-center transform origin-center top-0 -translate-y-6">In</p>
        <p className="absolute w-full text-center transform origin-center bottom-0 translate-y-6 rotate-180">Out</p>
      </div>
    </div>
  )
}

type Props = SquareBreathingSchema

export type SquareBreathingSchema = {
  type: "SquareBreathing"
  hex: string
  url: string
  label: string
  icon: "Favicon" | "Settings"
}