import { getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import React from "react";

interface AboutPageProps {
  recordMap: ExtendedRecordMap;
}
const AboutPage = ({ recordMap }: AboutPageProps) => {
  return (
    <>
      <section>
        <div className="w-4/5 mx-auto max-w-5xl py-16 flex flex-col gap-4">
          <p className="font-medium text-gray-700 text-2xl">Hello</p>
          <h2 className="font-bold text-6xl">About Me</h2>
          <NotionPageRenderer recordMap={recordMap} />
        </div>
      </section>
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
    },
  };
};
