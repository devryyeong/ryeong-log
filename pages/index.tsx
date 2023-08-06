import { getDatabaseItems } from "@/cms/notionClient";
import { parseDatabaseItems } from "@/utils/parseDatabaseItem";
import { GetStaticProps } from "next";

const Home = () => {
  return (
    <>
      <div>HOME</div>
      <div>HOME</div>
      <div>HOME</div>
    </>
  );
};

export default Home;

/**
 * 정적 사이트를 만들 때 사용
 * props의 객체가 Home의 props로 들어옴 
 * -> notionClient의 데이터베이스를 서버에서 가져옴
 * -> 가공해서 클라이언트에 props로 넘겨줌
 */
export const getStaticProps: GetStaticProps = async () => {
  // Type guard: 서버 사이드 함수에서 에러를 발생시켜줄텐데 이전 버전을 보여주게 됨
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);
  
  console.log("databaseItems >>", databaseItems); // TODO: 왜안되지!!!
  // const parsedDatabaseItems = parseDatabaseItems(databaseItems)
  return {
    props: {},
  }; 
};