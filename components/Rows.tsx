import * as React from "react";
import { AppContext, Row } from "../providers/AppProvider";
import { Droppable, Draggable, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Tile } from "./Tile";
import { Add, Drag } from "../icons/Icons";

export const Rows = ({ rows, editing }: RowsProps) => {
  return (
    <Droppable droppableId="RowContainer">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {rows.map((row, i) => (
            <Draggable
              key={row.id}
              draggableId={row.id}
              index={i}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={provided.draggableProps.style}
                >
                  <DraggableRow row={row} editing={editing} handle={provided.dragHandleProps} />  
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  )
}

type RowsProps = {
  rows: Array<Row>
  editing: boolean
}

const DraggableRow = ({ row, editing, handle }: RowProps) => {
  const { setSidebar } = React.useContext(AppContext);
  return (
    <div
      key={row.id}
      className={`
        ${editing ? "border-gray hover:text-gray-light hover:border-gray-light" : "border-transparent"}
        transition border-4 border-dashed text-gray w-full rounded-lg text-gray-light py-2 px-1 flex mt-2 relative
      `}
    >
      {row.columns.map(({ id, tile }) => tile ? (
        <div key={id} className="flex-1 aspect-w-5 aspect-h-1">
          <div className="h-full flex px-1">
            <Tile
              id={id}
              row={row}
              tile={tile}
            />
          </div>
        </div>
      ) : (
        <div key={id} className="flex-1 aspect-w-5 aspect-h-1">
          <button
            type="button"
            className={`${editing ? "px-1 outline-none focus:outline-none" : "invisible opacity-0 pointer-events-none"} transition`}
            onClick={() => setSidebar?.([row.id, id])}
          >
            <div className="transition border-4 border-dashed border-gray text-gray hover:border-gray-light hover:text-gray-light rounded-lg h-full flex items-center justify-center">
              <Add />
            </div>
          </button>
        </div>
      ))}
      <RowHandle editing={editing} handle={handle} />
    </div>
  )
}

type RowProps = {
  row: Row
  editing: boolean
  handle?: DraggableProvidedDragHandleProps
}

const RowHandle = ({ editing, handle }: HandleProps) => {
  return (
    <div 
      {...handle}
      className={editing ? "transition absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-black p-2 border-4 border-gray text-gray hover:text-gray-lightest hover:border-gray-lightest hover:bg-blue rounded-lg" : "hidden"}
    >
      <Drag size={24} />
    </div>
  )
}

type HandleProps = {
  editing: boolean
  handle?: DraggableProvidedDragHandleProps
}
