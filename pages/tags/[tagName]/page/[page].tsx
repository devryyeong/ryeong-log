import React from 'react'
import TagPage, { TagPageProps } from "..";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getDatabaseItems } from "@/cms/notionClient";
import { parseDatabaseItems } from "@/utils/parseDatabaseItem";
import { ITEMS_PER_PAGE } from "@/components/constant/pagenation";
import { getAllTags } from "@/utils/getAllTags";
import { insertPreviewImage } from "@/utils/previewImage";

const TagWithPage = ({ databaseItems, tagName, totalLength }: TagPageProps) => {
  return (
    <TagPage
      databaseItems={databaseItems}
      tagName={tagName}
      totalLength={totalLength}
    />
  );
};

export default TagWithPage;

interface TagPageParams extends ParsedUrlQuery {
  tagName: string;
  page: string;
}

export const getStaticProps: GetStaticProps<
  TagPageProps,
  TagPageParams
> = async ({ params }) => {
  const { tagName, page } = params!;

  /**
   * tag는 첫 글자만 대문자로 표기
   */
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1);

  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID, {
    filter: {
      tagName: pascalTagName,
    },
  });

  const parsedDatabaseItems = parseDatabaseItems(
    databaseItems.slice(
      (parseInt(page) - 1) * ITEMS_PER_PAGE,
      parseInt(page) * ITEMS_PER_PAGE
    )
  );

  const parsedDatabaseItemsWithPreview = await insertPreviewImage(
    parsedDatabaseItems
  );

  return {
    props: {
      databaseItems: parsedDatabaseItemsWithPreview,
      tagName: pascalTagName,
      totalLength: databaseItems.length,
    },
  };
  };

export const getStaticPaths: GetStaticPaths = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const allTags = getAllTags(databaseItems);

  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  // 모든 태그들의 name, id를 하나씩 가져와서 필터링을 해주는데, 이 태그를 가진 글이 몇 개인지를 객체로 리턴
  // {
  //   'web': 3,
  //   'react': 2,
  // }
  const lengthByTags = allTags.reduce<Record<string, number>>(
    (acc, { name, id }) => {
      const tagItems = parsedDatabaseItems.filter(
        (item) => item.tags.findIndex((tag) => tag.id === id) > -1
      );

      acc[name] = tagItems.length;

      return acc;
    },
    {}
  );

  // flatMap: 2차원 배열을 1차원 배열로
  // [['web, 1', 'web, 2'], ['react, 1', 'react, 2'], ['frontend, 1']]
  // ->
  // ['web, 1', 'web, 2', 'react, 1', 'react, 2', 'frontend, 1']
  const paths = allTags.flatMap(({ name: tagName }) =>
    Array.from(
      { length: Math.ceil(lengthByTags[tagName] / ITEMS_PER_PAGE) },
      (_, i) => ({
        params: {
          tagName,
          page: (i + 1).toString(),
        },
      })
    )
  );

  // {
  //   parmas: {
  //     tagName: string,
  //     page: string,
  //   }
  // }
  return {
    paths,
    fallback: "blocking",
  };
};

// dynamic route의 dynamic route(getStaticPaths) 정말 복잡하구나