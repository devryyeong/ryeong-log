import { getDatabaseItems } from "@/cms/notionClient";
import { parseDatabaseItems } from "@/utils/parseDatabaseItem";
import { data } from "autoprefixer";
import { GetStaticProps } from "next";
import Image from 'next/image'


const Home = () => {
  return (
    <>
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
 * @returns 
 */
export const getStaticProps: GetStaticProps = async () => {
  // 타입 가드
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);
  
  const parsedDatabaseItems = parseDatabaseItems(databaseItems)
  return {
    props: {},
  }; 
};