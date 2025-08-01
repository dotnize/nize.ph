import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "~/consts";
export async function GET(context) {
  const posts = (await getCollection("posts")).filter((post) => !post.data.unlisted); // filter out unlisted posts
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/posts/${post.id.split("/").pop()}/`,
    })),
  });
}
