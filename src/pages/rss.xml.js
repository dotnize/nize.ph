import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";
export async function GET(context) {
  const notes = await getCollection("notes");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: notes.map((note) => ({
      ...note.data,
      link: `/${note.id.split("/").pop()}/`,
    })),
  });
}
