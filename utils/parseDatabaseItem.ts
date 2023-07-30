import { getDatabaseItems } from "@/cms/notionClient";

interface ParsedDatabaseItemType {
  id: string;
  cover: string;
  icon: unknown;
  tags: unknown[];
  published: string;
  description: string;
  title: string;
}

// [util type]: return 값의 타입
export const parseDatabaseItems = (items: Awaited<ReturnType<typeof getDatabaseItems>>) => {
  const parsedItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
    // 타입 가드
    if (!('properties' in item)) return acc;

    const { id, icon, cover } = item;
    const { tags,작성일, 설명, 이름 } = item.properties

    const parsedCover = cover.
    const parsedResult: ParsedDatabaseItemType = {
      id, icon
    };

    return [
      ...acc,
    ];
  }, []);
};