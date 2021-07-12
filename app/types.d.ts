export type Maybe<T> = T | undefined

export type SettingsSchema = SettingsSchema.Header | SettingsSchema.Color | SettingsSchema.Text | SettingsSchema.Select
export namespace SettingsSchema {
  export type Header = {
    type: "header"
    id: string
  }

  export type Color = {
    type: "hex"
    id: string
    label: string
  }

  export type Text = {
    type: "text"
    id: string
    label: string
  }

  export type Select = {
    type: "select"
    id: string
    label: string
    options: Array<{
      label: string
      value: string
    }>
  }
}

export type TileSchemaMap = {
  Link: Array<SettingsSchema>
  Search: Array<SettingsSchema>
  Sticky: Array<SettingsSchema>
  RSS: Array<SettingsSchema>
}

export type Feed = {
  items: Array<{
    title: string
    categories: Array<string>
    link: string
  }>
}