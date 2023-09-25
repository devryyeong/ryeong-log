import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItem";
import TagItem from "./tagItem";

interface TagListProps {
  tags: ParsedDatabaseItemType["tags"];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <ul className="p-4 flex flex-row flex-wrap gap-2">
      {tags?.map((tag) => (
        <TagItem key={tag.id} tagItem={tag} />
      ))}
    </ul>
  );
}

export default TagList;