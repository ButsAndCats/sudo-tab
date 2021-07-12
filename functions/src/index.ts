import * as functions from "firebase-functions";
import * as Parser from "rss-parser";

export const feed = functions.https.onRequest(
    async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
      response.set("Access-Control-Allow-Headers", "*");
      try {
        const {url} = request.query;
        const parser: Parser = new Parser();
        if (typeof url === "string") {
          const feed = await parser.parseURL(url);
          functions.logger.info(feed, {
            structuredData: true,
          });
          response.status(200).json(feed);
        } else {
          response.status(422);
        }
      } catch (err) {
        response.status(500).json(err);
      }
    }
);
