import React from "react";
import CardList from "../card/CardList";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItem";
import Pagenation from "../common/Pagenation";
import { ITEMS_PER_PAGE } from "../constant/pagenation";

interface CardSectionProps {
  cardItems: ParsedDatabaseItemType[]
}
const CardSection = ({ cardItems }: CardSectionProps) => {
  return (
    <section>
      <div className="max-w-5xl w-4/5 mx-auto flex flex-col gap-6 py-8">
        <h3 className="font-bold text-3xl">Posts</h3>
        <CardList cardItems={cardItems} />
        <Pagenation totalPage={Math.ceil(cardItems.length / ITEMS_PER_PAGE)} />
      </div>
    </section>
  );
}

export default CardSection;