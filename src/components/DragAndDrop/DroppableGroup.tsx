import { useDrop } from "react-dnd";
import DraggableOption from "./DraggableOption";
import { Option, OptionGroup } from "@/types/types";

interface DroppableGroupProps {
  group: OptionGroup;
  moveOptionToGroup: (option: Option, group: OptionGroup | null) => void;
  handleOptionClick: (optionId: number) => void;
}

function DroppableGroup({
  group,
  moveOptionToGroup,
  handleOptionClick,
}: DroppableGroupProps) {
  const [, drop] = useDrop(() => ({
    accept: "OPTION",
    drop: (item: { option: Option }) => moveOptionToGroup(item.option, group),
  }));

  return (
    <fieldset
      ref={drop}
      className="grid grid-cols-[min-content_2fr] gap-6 border-2 border-[#70ad47] p-2"
    >
      <legend className="px-1 text-base">{group.option_group_name}</legend>
      {group.options.map((option) => (
        <DraggableOption
          key={option.option_id}
          option={option}
          onOptionClick={handleOptionClick}
          activeOption={null}
          noGroup={false}
        />
      ))}
    </fieldset>
  );
}

export default DroppableGroup;
