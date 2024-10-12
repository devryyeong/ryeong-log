import { getDatabaseItems } from "@/cms/notionClient";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface AllTagsType {}

export const getAllTags = (
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  const tags = items.reduce<
    MultiSelectPropertyItemObjectResponse["multi_select"]
  >((acc, item) => {
    if (!("properties" in item)) return acc;

    const { Tags } = item.properties;

    const tags = Tags.type === "multi_select" ? Tags.multi_select : [];
    console.log("tags", tags);

    if (Array.isArray(tags)) {
      tags.forEach((tag) => {
        const isAlreadyExist =
          acc.findIndex((accTag) => accTag.id === tag.id) > -1;

        if (!isAlreadyExist) acc.push(tag);
      });
    }

    return acc;
  }, []);
  return tags;
};
