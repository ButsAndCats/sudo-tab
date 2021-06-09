import * as React from "react";
import { SettingsSchema } from "../../types";
import { AppContext, TileData } from "../../providers/AppProvider";
import { Button } from "./Button";
import { FormTitle } from "./FormTitle";
import { HexInput } from "./HexInput";
import { Select } from "./Select";
import { TextInput } from "./TextInput";

const formMap: Record<string, (value: string, props: any) => JSX.Element> = {
  header: (value: string) => <FormTitle value={value} />,
  hex: (value: string, props: SettingsSchema.Color) => <HexInput {...props} value={value} />,
  text: (value: string, props: SettingsSchema.Text) => <TextInput {...props} value={value} />,
  select: (value: string, props: SettingsSchema.Select) => <Select {...props} value={value} />,
}

export const SettingsForm: React.FC<Props> = ({ schema, data, ids, handleSaveSettings }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const { elements } = formRef.current as HTMLFormElement;
        handleSaveSettings?.(elements, schema, ids)
      }}
    >
      {schema.map((props) => {
        const { type, id } = props
        return (
          <div className="mb-4" key={id}>
            {/*
            //@ts-ignore*/}
            {formMap[type] ? formMap[type](data.schema[id], props) : type}
          </div>
        );
      })}
      <Button type="submit">
        Save
      </Button>
    </form>
  );
}

type Props = {
  data: TileData
  schema: Array<SettingsSchema>
  ids: [string, string]
  handleSaveSettings: ((elements: HTMLFormControlsCollection, schema: Array<SettingsSchema>, ids: [string, string]) => void) | null
}