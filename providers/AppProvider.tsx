import React, { useState, useEffect, createContext } from "react"
import * as Store from "store"
import { v4 as uuidv4 } from "uuid";
import { CONFIG_NAMESPACE } from "../utils/constants";
import { ModalContext } from "./ModalProvider";
import { SettingsForm } from "../components/SettingsForm/SettingsForm";
import { LinkSchema } from "../components/Tiles/Link";
import { getTileSettingsSchema } from "../utils/utils";
import { SettingsSchema } from "../types";
import { SearchSchema } from "../components/Tiles/Search";
import { DropResult } from "react-beautiful-dnd";
import { StickySchema } from "../components/Tiles/Sticky";

const contextDefaultValues = {
  sidebar: null,
  setSidebar: null,
  editing: false,
  setEditing: null,
  handleAddNewTile: null,
  tiles: [],
  setTiles: null,
  rows: [],
  handleAddRow: null,
  handleDeleteTile: null,
  handleEditTile: null,
  handleSaveSettings: null,
  handleDragEnd: null
}
export const AppContext = createContext<AppContextState>(contextDefaultValues);

export const AppProvider: React.FC = ({ children }) => {
  const [rows, setRows] = useState<Array<Row>>([]);
  const [sidebar, setSidebar] = useState<Adding | null>(contextDefaultValues.sidebar);
  const [editing, setEditing] = useState<boolean>(contextDefaultValues.editing);
  const { handleShowModal, handleCloseModal } = React.useContext(ModalContext);

  useEffect(() => {
    const config = Store.get(CONFIG_NAMESPACE);
    setRows(config || []);
  }, [])

  useEffect(() => {
    Store.set(CONFIG_NAMESPACE, rows)
  }, [rows])
  
  const handleAddNewTile = (tile: TileSchemas) => {
    const newTile = {
      id: uuidv4(),
      schema: tile,
    }

    setRows((prev) => {
      const next = prev.slice();
      const row = next.findIndex((r) => r.id === sidebar?.[0]);
      const column = next[row].columns.findIndex((c) => c.id === sidebar?.[1]);
      next[row].columns[column].tile = newTile
      const settingsSchema = getTileSettingsSchema(tile.type);
      if (settingsSchema && handleShowModal && sidebar) {
        console.log(settingsSchema)
        handleShowModal(<SettingsForm schema={settingsSchema} data={newTile} ids={sidebar} handleSaveSettings={handleSaveSettings} />)
      }
      
      return next
    });

    setSidebar(null);
  }

  const handleDragEnd = (snapshot: DropResult) => {
    const { reason, destination, source, type } = snapshot;
    if (reason === "DROP" && destination && source) {
      if (type === "Row") {
        setRows((prev) => {
          const next = prev.slice();
          next.splice(destination.index, 0, next.splice(source.index, 1)[0]);
          return next
        })
      } else if (type === "Column") {
        setRows((prev) => {
          const next = prev.slice();
          const sourceRow = next.findIndex(({ id }) => id === source.droppableId);
          const destinationRow = next.findIndex(({ id }) => id === destination.droppableId);
          console.log(sourceRow, destinationRow);
          return next
        })
      }
    }
  }

  const handleSaveSettings = (elements: HTMLFormControlsCollection, schema: Array<SettingsSchema>, ids: [string, string]) => {
    setRows((prev) => {
      const next = prev.slice();
      const row = next.findIndex(({ id }) => id === ids[0]);
      const column = next[row].columns.findIndex(({ id }) => id === ids[1]);
      const schemaIds = schema.map(({ id }) => id);
      const elementsMap: Record<string, HTMLInputElement | HTMLSelectElement> = {};
      Array.from(elements).forEach(element => {
        const elem = element as HTMLInputElement | HTMLSelectElement;
        if (elem.name !== "") {
          elementsMap[elem.name] = elem;
        }
      });
      if (next) {
        schemaIds.forEach((id) => {
          if (elementsMap[id]) {
            if (next[row].columns[column].tile?.schema) {
              const schema = next[row].columns[column].tile?.schema
              if (schema) {
                {/* 
                //@ts-ignore */}
                next[row].columns[column].tile.schema[id] = elementsMap[id].value
              }
            }
            
          }
        })
      }
      
      return next;
    });
    handleCloseModal?.();
  }

  const handleEditTile = (tile: TileData, rowId: string, columnId: string) => {
    const settingsSchema = getTileSettingsSchema(tile.schema.type);
    if (settingsSchema && handleShowModal) {
      const row = rows.findIndex(({ id }) => id === rowId);
      const column = rows[row].columns.findIndex(({ id }) => id === columnId);
      const data = rows[row].columns[column].tile
      if (data) {
        handleShowModal(<SettingsForm schema={settingsSchema} data={data} ids={[rowId, columnId]}  handleSaveSettings={handleSaveSettings} />)
      }
    }
  }

  const handleDeleteTile = (rowId: string, columnId: string) => {
    setRows((prev) => {
      const next = prev.slice();
      const row = next.findIndex((r) => r.id === rowId);
      const column = next[row].columns.findIndex((c) => c.id === columnId);
      next[row].columns[column].tile = null
      return next
    });
  }
  
  const handleAddRow = () => {
    setRows((prev) => [...prev, {
      id:  uuidv4(),
      columns: [
        { id:  uuidv4(), tile: null },
        { id:  uuidv4(), tile: null },
        { id:  uuidv4(), tile: null },
        { id:  uuidv4(), tile: null },
        { id:  uuidv4(), tile: null },
      ]
    }])
  }

  return (
    <AppContext.Provider
      value={{
        sidebar,
        setSidebar,
        editing,
        setEditing,
        handleAddNewTile,
        handleAddRow,
        rows,
        handleDeleteTile,
        handleEditTile,
        handleSaveSettings,
        handleDragEnd,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

type AppContextState = {
  sidebar: Adding | null
  setSidebar: React.Dispatch<React.SetStateAction<Adding | null>> | null
  editing: boolean
  setEditing: React.Dispatch<React.SetStateAction<boolean>> | null
  handleAddNewTile: ((tile: TileSchemas) => void) | null
  rows: Array<Row>
  handleAddRow: (() => void) | null
  handleDeleteTile: ((row: string, column: string) => void) | null
  handleEditTile: ((tile: TileData, rowId: string, columnId: string) => void) | null
  handleSaveSettings: ((elements: HTMLFormControlsCollection, schema: Array<SettingsSchema>, ids: [string, string]) => void) | null
  handleDragEnd: ((snapshot: DropResult) => void) | null
}

export type TileData = {
  id: string,
  schema: TileSchemas
}

export type Adding = [string, string];

export type TileSchemas = TileSchemas.Link | TileSchemas.Search | TileSchemas.Sticky

export namespace TileSchemas {
  export type Link = LinkSchema
  export type Search = SearchSchema
  export type Sticky = StickySchema
}

export type Row = {
  id: string
  columns: Array<Column>
}

export type Column = {
  id: string
  tile: TileData | null
}