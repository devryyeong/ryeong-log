import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItem";
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import IconRenderer from "./IconRenderer";

interface CardItemProps {
  cardItem: ParsedDatabaseItemType;
}

const CardItem = ({ cardItem }: CardItemProps) => {
  const { id, icon, cover, title, description, tags, published } = cardItem;

  return (
    <li className="rounded-2xl overflow-hidden shadow-lg group">
      <Link href={`blog/${id}`}>
        <a>
          <div className="relative aspect-[1.3/1]">
            <Image
              src={cover}
              alt={title}
              layout="fill"
              className="group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col gap-5 p-6">
            <h4 className="flex flex-row items-center gap-1 font-semibold text-2xl group-hover:text-sky-600 transition-colors">
              <IconRenderer icon={icon} /> {title}
            </h4>
            {description ? (
              <p className="font-medium text-gray-600">{description}</p>
            ) : null}
            <time>{published}</time>
          </div>
        </a>
      </Link>
      {/* tags */}
    </li>
  );
}

export default CardItem;