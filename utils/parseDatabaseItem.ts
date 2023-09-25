import { getDatabaseItems } from "@/cms/notionClient";
import { MultiSelectPropertyItemObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface ParsedDatabaseItemType {
  id: string;
  cover?: string;
  icon?: PageObjectResponse["icon"];
  tags?: MultiSelectPropertyItemObjectResponse["multi_select"];
  published?: string;
  description?: string;
  title?: string;
}

// [util type]: return 값의 타입
export const parseDatabaseItems = (items: Awaited<ReturnType<typeof getDatabaseItems>>) => {
  const parsedItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
    // 타입 가드
    if (!("properties" in item)) return acc; // PartialPageObjectResponse인 경우

    const { id, icon, cover } = item;
    const { Tags, Date, Description, Name } = item.properties;

    const parsedCover = cover?.type === "file" ? cover.file.url : cover?.external.url ?? "";

    const published =
      (Date.type === "date" ? Date.date?.start : "") ?? "";
    
    const description =
      (Description.type === "rich_text"
        ? Description.rich_text[0]?.plain_text
        : "") ?? "";
    
    const title = (Name.type === "title" ? Name.title[0]?.plain_text : "") ?? "";
    
    const tags = Tags.type === "multi_select" ? Tags.multi_select : [];

    const parsedResult: ParsedDatabaseItemType = {
      id,
      cover: parsedCover,
      icon,
      tags,
      published,
      title,
      description,
    };

    return [...acc, parsedResult];
  }, []);

  return parsedItems;
};