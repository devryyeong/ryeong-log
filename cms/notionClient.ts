/**
 * CMS: Contents Management System
 * 주로 블로그나 쇼핑몰에서 데이터를 가져올 때 사용하는 용어
 */
import { Client } from "@notionhq/client";

// Server side에서만 실행 가능
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabaseItems = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return response.results;
};