import { getDatabaseItems } from "@/cms/notionClient";
import { ITEMS_PER_PAGE } from "@/components/constant/pagenation";
import CardSection from "@/components/intro/CardSection";
import TagHeroSection from "@/components/tags/TagHeroSection";
import { getAllTags } from "@/utils/getAllTags";
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItem";
import { insertPreviewImage } from "@/utils/previewImage";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

export interface TagPageProps {
  databaseItems: ParsedDatabaseItemType[];
  tagName: string;
  totalLength: number;
}

interface TagPageParams extends ParsedUrlQuery {
  tagName: string;
}

const TagPage = ({ databaseItems, tagName, totalLength }: TagPageProps) => {
  return (
    <>
      <TagHeroSection title={`#${tagName}`} />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </>
  );
};

export default TagPage;

export const getStaticProps: GetStaticProps<
  TagPageProps,
  TagPageParams
> = async ({ params }) => {
  const { tagName } = params!;

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
    databaseItems.slice(0, ITEMS_PER_PAGE)
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

  const tags = getAllTags(databaseItems);

  const paths = tags.map(({ name: tagName }) => ({
    params: {
      tagName: tagName.toLocaleLowerCase(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
