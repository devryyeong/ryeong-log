import { getDatabaseItems } from "@/cms/notionClient";

export interface ParsedDatabaseItemType {
  id?: string;
  cover?: string;
  icon?: unknown;
  tags?: unknown[];
  published?: string;
  description?: string;
  title?: string;
}

// [util type]: return 값의 타입
export const parseDatabaseItems = (items: Awaited<ReturnType<typeof getDatabaseItems>>) => {
  const parsedItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
    // 타입 가드
    if (!('properties' in item)) return acc;

    const { id, icon, cover } = item;
    const { Tags, Created, Description, Name } = item.properties;

    const parsedCover = cover?.type === "file" ? cover.file.url : cover?.external.url ?? "";
    const published =
      (Created.type === "date" ? Created.date?.start : "") ?? "";
    const description =
      (Description.type === "rich_text"
        ? Description.rich_text[0]?.plain_text
        : "") ?? "";
    const title = (Name.type === "title" ? Name.title[0]?.plain_text : "") ?? "";
    const tags = Tags.type === "multi_select" ? Tags.multi_select : [];

    const parsedResult: ParsedDatabaseItemType = {
      id,
      icon,
      cover: parsedCover,
      published,
      description,
      title,
      tags,
    };

    return [...acc, parsedResult];
  }, []);
};