import React from 'react'
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItem";
import Image from "next/image";

interface IconRendererProps {
  icon: ParsedDatabaseItemType["icon"];
}

const IconRenderer = ({ icon }: IconRendererProps) => {
  if (!icon) return null;

  if (icon.type === "emoji") return <span>{icon.emoji}</span>;

  const iconUrl = icon.type === "file" ? icon.file.url : icon.external.url;
  return (
    <Image src={iconUrl} alt="icon" width={26} height={26} className="rounded-md" />
  );
};

export default IconRenderer;