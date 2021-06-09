import * as React from "react";
import { AppContext } from "../providers/AppProvider";
import { DragDropContext } from "react-beautiful-dnd";
import { Add } from "../icons/Icons";
import { Rows } from "./Rows";

export const TilesList: React.FC = () => {
  const { editing, handleAddRow, rows } = React.useContext(AppContext);

  return (
    <>
      <DragDropContext
        onDragEnd={(e) => console.log(e)}
      >
        <Rows rows={rows} editing={editing} />
      </DragDropContext>
      {editing ? (
        <button onClick={() => handleAddRow?.()} className="transition border-4 border-dashed border-gray text-gray w-full rounded-lg py-4 flex items-center justify-center mt-2 focus:outline-none hover:border-gray-light hover:text-gray-light">
          <Add />
        </button>
      ) : null}
    </>
  )
}