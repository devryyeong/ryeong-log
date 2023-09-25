import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItem";
import CardItem from "./CardItem";

interface CardListProps {
  cardItems: ParsedDatabaseItemType[];
}
const CardList = ({ cardItems }: CardListProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {
        cardItems.map((cardItem) => (
          <CardItem key={cardItem.id} cardItem={cardItem} />
        ))
      }
    </ul>
  )
}

export default CardList;