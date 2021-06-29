import * as React from "react";
import { AppContext, Row, TileData, TileSchemas } from "../providers/AppProvider";
import { Link } from "./Tiles/Link";
import { Search } from "./Tiles/Search";
import { Sticky } from "./Tiles/Sticky";
import { RSS } from "./Tiles/RSS";
import { isLightColor } from "../utils/utils";
import { Drag, Settings, Delete } from "./icons/Icons";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

const tileMap = {
  Link: (props: TileSchemas.Link) => <Link {...props} />,
  Search: (props: TileSchemas.Search) => <Search {...props} />,
  Sticky: (props: TileSchemas.Sticky) => <Sticky {...props} />,
  RSS: (props: TileSchemas.RSS) => <RSS {...props} />,
}

export const Tile: React.FC<Props> = ({ id, tile, row, handle }) => {
  const { editing, handleDeleteTile, handleEditTile } = React.useContext(AppContext);
  return (
    <div
      id={id}
      className={`h-full w-full relative overflow-hidden rounded-lg float-left ${`${isLightColor(tile.schema.hex) ? "text-black" : "text-white"}`}`}
    >
      {/* 
      //@ts-ignore */}
      {tileMap[tile.schema.type](tile.schema)}
      
      <div className={`absolute inset-0 ${editing ? "block" : "hidden"}`}>
        <button
          {...handle}
          className={`p-4 absolute top-0 left-0 outline-none focus:outline-none`}
        >
          <Drag size={24} />
        </button>
        <button className="p-4 absolute bottom-0 right-0 outline-none focus:outline-none" onClick={() => handleDeleteTile?.(row.id, id)}>
          <Delete size={24} />
        </button>
        <button className="p-4 absolute top-0 right-0 outline-none focus:outline-none" onClick={() => handleEditTile?.(tile, row.id, id)}>
          <Settings size={24} />
        </button>
      </div>

    </div>
  )
}

type Props = {
  tile: TileData
  row: Row
  id: string
  handle?: DraggableProvidedDragHandleProps
}