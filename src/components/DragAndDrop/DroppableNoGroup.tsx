import { useDrop } from "react-dnd";
import DraggableOption from "./DraggableOption";
import { Option, OptionGroup } from "@/types/types";

interface DroppableNoGroupProps {
  noGroupOptions: Option[];
  moveOptionToGroup: (option: Option, group: OptionGroup | null) => void;
  handleOptionClick: (optionId: number) => void;
  activeOption: number | null;
}

function DroppableNoGroup({
  noGroupOptions,
  moveOptionToGroup,
  handleOptionClick,
  activeOption,
}: DroppableNoGroupProps) {
  const [, drop] = useDrop(() => ({
    accept: "OPTION",
    drop: (item: { option: Option }) => moveOptionToGroup(item.option, null),
  }));

  return (
    <fieldset
      ref={drop}
      className="grid grid-cols-[min-content_2fr] gap-6 border-2 border-destructive p-2"
    >
      <legend className="px-1 text-base">No Group Options</legend>
      {noGroupOptions.map((option) => (
        <DraggableOption
          key={option.option_id}
          option={option}
          onOptionClick={handleOptionClick}
          activeOption={activeOption}
          noGroup={true}
        />
      ))}
    </fieldset>
  );
}

export default DroppableNoGroup;
