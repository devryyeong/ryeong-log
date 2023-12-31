import { getDatabaseItems } from "@/cms/notionClient";
import { ITEMS_PER_PAGE } from "@/components/constant/pagenation";
import CardSection from "@/components/intro/CardSection";
import HeroSection from "@/components/intro/HeroSection";
import { ParsedDatabaseItemType, parseDatabaseItems } from "@/utils/parseDatabaseItem";
import { insertPreviewImage } from "@/utils/previewImage";
import { GetStaticProps } from "next";

export interface HomeProps {
  databaseItems: ParsedDatabaseItemType[];
  totalLength: number;
}

const Home = ({ databaseItems, totalLength }: HomeProps) => {
  return (
    <>
      <HeroSection />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </>
  );
};

export default Home;

/**
 * 정적 사이트를 만들 때 사용
 * 빌드 타임에 페이지를 받아옴
 * props의 객체가 Home의 props로 들어옴 
 * -> notionClient의 데이터베이스를 서버에서 가져옴
 * -> 가공해서 클라이언트에 props로 넘겨줌
 */
export const getStaticProps: GetStaticProps = async () => {
  // Type guard: 서버 사이드 함수에서 에러를 발생시켜줄텐데 이전 버전을 보여주게 됨
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(0, ITEMS_PER_PAGE));
  
  const parsedDatabaseItemsWithPreview = await insertPreviewImage(
    parsedDatabaseItems
  );
  
  return {
    props: {
      databaseItems: parsedDatabaseItemsWithPreview,
      totalLength: databaseItems.length,
    },
    revalidate: 300,
  }; 
};