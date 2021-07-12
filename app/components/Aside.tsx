import * as React from "react";
import { AppContext } from "../providers/AppProvider";
import * as Link from "./Tiles/Link";
import * as Search from "./Tiles/Search";
import * as Sticky from "./Tiles/Sticky";
import * as RSS from "./Tiles/RSS";
import { Button } from "./Button";

const tiles = [Link.defaultSchema, Search.defaultSchema, Sticky.defaultSchema, RSS.defaultSchema]
export const Aside: React.FC = () => {
  const { sidebar, setSidebar, handleAddNewTile } = React.useContext(AppContext);
  return (
    <aside className={`fixed inset-0 transition ${sidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-gray opacity-40 absolute inset-0" onClick={() => setSidebar?.(undefined)}/>
      <div className={`absolute inset-y-0 left-0 bg-gray p-4 transition transform ${sidebar ? "translate-x-0" : "-translate-x-full"} z-10`}>
        <div>
          <h3 className="text-xl mb-4 font-bold">Choose a tile</h3>
          {tiles.map((tile) => (
            <Button
              key={tile.type}
              onClick={() => handleAddNewTile?.(tile)}
              colour="aside"
              className="mb-2 w-full"
            >
              {tile.type}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  )
}