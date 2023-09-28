/**
 * CMS: Contents Management System
 * 주로 블로그나 쇼핑몰에서 데이터를 가져올 때 사용하는 용어
 */
import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";

// Server side에서만 실행 가능
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

interface DatabaseQueryOption {
  filter?: {
    tagName?: string;
  }
}

export const getDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Public",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Tags",
          multi_select: {
            contains: option?.filter?.tagName ?? "",
          },
        },
      ],
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

export const getSearchItems = async (query: string) => {
  const response = await notionClient.search({
    query,
    filter: {
      property: "object",
      value: "page",
    },
    sort: {
      direction: "descending",
      timestamp: "last_edited_time"
    }
  })
  return response.results as (PageObjectResponse | PartialPageObjectResponse)[];
}

export const unofficialNotionClient = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const response = await unofficialNotionClient.getPage(pageId);

  return response;
};