import * as React from "react";
import { AppContext } from "../providers/AppProvider";

export const Controls: React.FC = () => {
  const { editing, setEditing } = React.useContext(AppContext);
  return (
    <div
    className="fixed bottom-0 right-0 pr-2 pb-2"
    >
      <button
        className={`outline-none focus:outline-none transition py-2 px-4 rounded-full ${editing ? "bg-blue" : "bg-transparent hover:bg-blue"}`}
        onClick={() => {
          setEditing?.((prev) => !prev)
        }}
      >
        {editing ? "Save" : "Customise"}
      </button>
    </div>
  )
}