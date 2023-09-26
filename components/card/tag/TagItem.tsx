import React from "react";
import Link from "next/link";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItem";
import { COLOR_TABLE } from "@/components/constant/color";

interface TagItemProps {
  tagItem: ParsedDatabaseItemType["tags"][number];
}

const TagItem = ({ tagItem }: TagItemProps) => {
  const { name, color } = tagItem;

  return (
    <li>
      <Link href={`/tag/${name.toLowerCase()}`}>
        <a
          className="hover:underline px-2 py-1 rounded-md font-light"
          style={{ backgroundColor: COLOR_TABLE[color], }}
        >
          {name}
        </a>
      </Link>
    </li>
  );
};

export default TagItem;
