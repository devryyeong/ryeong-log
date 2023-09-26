import { getDatabaseItems } from "@/cms/notionClient";
import { getAllTags } from "@/utils/getAllTags";
import { ParsedDatabaseItemType, parseDatabaseItems } from "@/utils/parseDatabaseItem";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface TagPageProps {
  databaseItems: ParsedDatabaseItemType[];
}

interface TagPageParams extends ParsedUrlQuery {
  tagName: string;
}

const TagPage = ({ databaseItems }: TagPageProps) => {
  return <div>TagPage</div>;
};

export default TagPage;

export const getStaticProps: GetStaticProps<TagPageProps, TagPageParams> = async ({
  params
}) => {
  const { tagName } = params!;

  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID, {
    filter: {
      tagName: tagName[0].toUpperCase() + tagName.slice(1), // tag는 첫 글자만 대문자로 표기
    }
  });

  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      databaseItems: parsedDatabaseItems,
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
