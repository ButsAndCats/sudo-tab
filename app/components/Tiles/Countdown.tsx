import * as React from "react";
import { SettingsSchema } from "../../types";
import { isLightColor } from "../../utils/utils";

const getTodayPlus30 = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date
}

const defaults: CountdownSchema = {
  type: "Countdown",
  hex: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  date: getTodayPlus30(),
}
export const defaultSchema: CountdownSchema = Object.assign({}, defaults)

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
    type: "date",
    id: "date",
    label: "Date"
  },
]

export const Countdown: React.FC<Props> = ({ hex, date }) => {
  const[rDay, setRDay] = React.useState(0);
  const[rHour, setRHour] = React.useState(0);
  const[rMin, setRMin] = React.useState(0);
  const[rSec, setRSec] = React.useState(0);

  const getTime = React.useCallback(() => {
    const finishDate = new Date(date).getTime();
    const currentDate = new Date().getTime();
    const distance = finishDate - currentDate;

    const remainingDay = Math.floor(distance / (1000 * 60 * 60 * 24));
    const remainingHour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSecond = Math.floor((distance % (1000 * 60)) / 1000);

    setRDay(remainingDay);
    setRHour(remainingHour);
    setRMin(remainingMinute);
    setRSec(remainingSecond); 
  }, [date])

  React.useEffect(() => {
    setInterval(() => {
      getTime();
    }, 1000)
  }, [])

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${isLightColor(hex) ? "text-black" : "text-white"}`}
      style={{
        backgroundColor: hex
      }}
    >
      <h3>
        <span>{`${rDay}d`}</span>{" "}
        <span>{`${rHour}h `}</span>{" "}
        <span>{`${rMin}m `}</span>{" "}
        <span>{`${rSec}s`}</span>
      </h3>
    </div>
  )
}

type Props = CountdownSchema

export type CountdownSchema = {
  type: "Countdown"
  hex: string
  date: Date
}