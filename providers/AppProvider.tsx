import React, { useState, useEffect, createContext } from "react"
import * as Store from "store"
import { v4 as uuidv4 } from "uuid";
import { CONFIG_NAMESPACE } from "../utils/constants";
import { ModalContext } from "./ModalProvider";
import { SettingsForm } from "../components/SettingsForm/SettingsForm";
import { LinkSchema } from "../components/Tiles/Link";
import { getTileSettingsSchema } from "../utils/utils";
import { Maybe, SettingsSchema } from "../types";
import { SearchSchema } from "../components/Tiles/Search";
import { DropResult } from "react-beautiful-dnd";
import { StickySchema } from "../components/Tiles/Sticky";

const contextDefaultValues = {
  sidebar: undefined,
  setSidebar: undefined,
  editing: false,
  setEditing: undefined,
  handleAddNewTile: undefined,
  tiles: [],
  setTiles: undefined,
  rows: [],
  handleAddRow: undefined,
  handleDeleteRow: undefined,
  handleDeleteTile: undefined,
  handleEditTile: undefined,
  handleSaveSettings: undefined,
  handleDragEnd: undefined,
  handleAddNewBlankTile: undefined,
}
export const AppContext = createContext<AppContextState>(contextDefaultValues);

export const AppProvider: React.FC = ({ children }) => {
  const [rows, setRows] = useState<AppContextState["rows"]>([]);
  const [sidebar, setSidebar] = useState<AppContextState["sidebar"]>(contextDefaultValues.sidebar);
  const [editing, setEditing] = useState<AppContextState["editing"]>(contextDefaultValues.editing);
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

    setSidebar(undefined);
  }

  /**
   * Add a new empty tile to the end of the current row
   */
  const handleAddNewBlankTile = (rowId: string) => {
    setRows((prev) => {
      const next = prev.slice();
      const row = rows.findIndex(({ id }) => id === rowId);
      next[row].columns = [...next[row].columns, { id:  uuidv4(), tile: null }]
      return next
    })
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

  const handleDeleteRow = (rowId: string) => {
    setRows((prev) => {
      const next = prev.slice();
      const row = prev.findIndex((r) => r.id === rowId);
      next.splice(row, 1)
      return next
    });
  }

  return (
    <AppContext.Provider
      value={{
        sidebar,
        setSidebar,
        editing,
        setEditing,
        handleAddNewTile,
        handleAddNewBlankTile,
        handleAddRow,
        handleDeleteRow,
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
  sidebar: Maybe<Adding>
  setSidebar: Maybe<React.Dispatch<React.SetStateAction<AppContextState["sidebar"]>>>
  editing: boolean
  setEditing: Maybe<React.Dispatch<React.SetStateAction<boolean>>>
  handleAddNewTile: Maybe<((tile: TileSchemas) => void)>
  rows: Array<Row>
  handleAddRow: Maybe<(() => void)>
  handleDeleteTile: Maybe<((row: string, column: string) => void)>
  handleDeleteRow: Maybe<((rowId: string) => void)>
  handleEditTile: Maybe<((tile: TileData, rowId: string, columnId: string) => void)>
  handleSaveSettings: Maybe<((elements: HTMLFormControlsCollection, schema: Array<SettingsSchema>, ids: [string, string]) => void)>
  handleDragEnd: Maybe<((snapshot: DropResult) => void)>
  handleAddNewBlankTile: Maybe<((rowId: string) => void)>
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