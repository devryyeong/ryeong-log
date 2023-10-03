import { getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import React from 'react'

interface AboutPageProps {
  recordMap: ExtendedRecordMap;
}
const AboutPage = ({ recordMap }: AboutPageProps) => {
  return(
    <>
      <NotionPageRenderer recordMap={recordMap} />
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  if (!process.env.PROFILE_ID) throw new Error("PROFILE_ID is not defined");
  const profileId = process.env.PROFILE_ID;

  const recordMap = await getPageContent(profileId);
  return {
    props: {
      recordMap,
    }
  }
}