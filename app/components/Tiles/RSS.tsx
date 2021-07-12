import * as React from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import { Feed, SettingsSchema } from "../../types";
import { isLightColor } from "../../utils/utils";

const defaults: RSSSchema = {
  type: "RSS",
  hex: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  url: "https://dev.to/feed",
}
export const defaultSchema: RSSSchema = Object.assign({}, defaults)

export const schema: Array<SettingsSchema> = [
  {
    type: "header",
    id: "type"
  },
  {
    type: "hex",
    id: "hex",  
    label: "Colour",
  },
  {
    type: "text",
    id: "url",
    label: "Feed URL"
  },
]

export const RSS: React.FC<Props> = ({ hex, url }) => {
  const { getFeed } = React.useContext(FirebaseContext)
  const [feed, setFeed] = React.useState<Feed>();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (getFeed && url?.length) {
      (async () => {
        try {
          setError(undefined)
          const _feed = await getFeed(url);
          console.log(_feed);
          setFeed(_feed);
        } catch (err) {
          setError("Unable to connect with this feed, perhaps there was a mistake with the URL?");
        }
      })()
    }
  }, [url, getFeed])

  return (
    <a
      href={url}
      className={`absolute inset-0 overflow-y-auto p-4 ${isLightColor(hex) ? "text-black" : "text-white"}`}
      style={{
        backgroundColor: hex
      }}
    >
      <div>
        {error ? (
          <p>{error}</p>
        ) : feed ? (
          <div>
            <ul>
              {feed.items.map(({ title, categories, link }) => (
                <li className="mb-4 border-b">
                  <a href={link}>
                    <h5 className="font-semibold mb-2">{title}</h5>
                    <ul className="mb-2">
                      {categories?.map((category) => (
                        <li
                          className={`inline-block mr-1 px-2 rounded ${isLightColor(hex) ? "bg-black" : "bg-white"}`}
                          style={{
                            color: hex,
                          }}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </a>
  )
}

type Props = RSSSchema

export type RSSSchema = {
  type: "RSS"
  hex: string
  url: string
}

