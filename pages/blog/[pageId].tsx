import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import Comments from "@/components/common/Comments";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { insertPreviewImageToRecordMap } from "@/utils/previewImage";
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
      <Comments />
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

  const previewImage = await insertPreviewImageToRecordMap(recordMap);

  return {
    props: {
      recordMap: {
        ...recordMap,
        preview_images: previewImage,
      }
    },
    revalidate: 300,
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
    fallback: "blocking",
  }
}
