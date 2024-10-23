import { getDatabaseItems } from "@/cms/notionClient";
import {
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { MakePreviewImageType } from "./previewImage";

export interface ParsedDatabaseItemType {
  id: string;
  cover: string;
  icon: PageObjectResponse["icon"];
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
  published: string;
  description: string;
  title: string;
  previewImage?: MakePreviewImageType;
}

// [util type]: return 값의 타입
export const parseDatabaseItems = (
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  // DatabaseObjectResponse 타입인지 검사하는 타입 가드 함수
  const instanceOfDatabaseObjectResponse = (
    object: any
  ): object is DatabaseObjectResponse => {
    return "parent" in object;
  };

  const parsedItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
    // 타입 가드
    if (!("properties" in item)) return acc; // PartialPageObjectResponse∏인 경우

    // parent type이 database_id or block_id일 수 있으므로
    if (
      instanceOfDatabaseObjectResponse(item) &&
      item.parent.type !== "database_id"
    )
      return acc;

    const { id, icon, cover } = item as PageObjectResponse;
    const { Tags, Date, Description, Name } = item.properties;

    const parsedCover =
      cover?.type === "file" ? cover.file.url : cover?.external.url ?? "";

    const published = (Date.type === "date" ? Date.date?.start : "") ?? "";

    const description =
      (Description.type === "rich_text"
        ? Description.rich_text[0]?.plain_text
        : "") ?? "";

    const title =
      (Name.type === "title" ? Name.title[0]?.plain_text : "") ?? "";

    // const tags = Tags.type === "multi_select" ? Tags.multi_select : [];
    const tags = Tags["multi_select"];

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
