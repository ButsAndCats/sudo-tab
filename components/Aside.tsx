import * as React from "react";
import { AppContext } from "../providers/AppProvider";
import * as Link from "./Tiles/Link";

const tiles = [Link.defaultSchema]
export const Aside: React.FC = () => {
  const { sidebar, setSidebar, handleAddNewTile } = React.useContext(AppContext);
  return (
    <aside className={`fixed inset-0 transition ${sidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-gray opacity-40 absolute inset-0" onClick={() => setSidebar?.(null)}/>
      <div className={`absolute inset-y-0 left-0 bg-gray p-4 transition transform ${sidebar ? "translate-x-0" : "-translate-x-full"} z-10`}>
        {tiles.map((tile) => (
          <button
            key={tile.type}
            onClick={() => handleAddNewTile?.(tile)}
            className="bg-blue rounded-lg h-40 w-40 flex items-center justify-center"
          >
            <span>{tile.type}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}