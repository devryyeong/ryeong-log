import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { GetStaticPaths, GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types"
import { ParsedUrlQuery } from "querystring";

interface DetailBlogPageProps {
  recordMap: ExtendedRecordMap
}

/**
 * ParsedUrlQuery의 구조: [key: string]: string
 */
interface DetailBlogPageParams extends ParsedUrlQuery {
  pageId: string;
}

const DetailBlogPage = ({ recordMap }: DetailBlogPageProps) => {
  console.log('recordMap: ', recordMap)
  return (
    <>
      <NotionPageRenderer recordMap={recordMap} />
    </>
  );
};

export default DetailBlogPage;

export const getStaticProps: GetStaticProps<
  DetailBlogPageProps,
  DetailBlogPageParams
> = async ({ params }) => {
  const { pageId } = params!;

  const recordMap = await getPageContent(pageId);
  return {
    props: {
      recordMap,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  // pageId를 담은 배열 만들어서 넘기기
  const paths = databaseItems.map((item) => ({
    params: {
      pageId: item.id,
    },
  }));

  return {
    paths,
    fallback: true,
  }
}
