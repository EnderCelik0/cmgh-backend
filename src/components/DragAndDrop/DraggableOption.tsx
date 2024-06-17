import { useDrag } from "react-dnd";

interface Option {
  option_id: number;
  option_name: string;
  user_friendly_option_name: string;
  full_summary_name: string;
  thumbnail_size: string;
  available_default: boolean;
  has_quantity_control: boolean;
  option_img: string;
  disabled: boolean;
  option_group_id: number;
}

interface DraggableOptionProps {
  option: Option;
  onOptionClick: (optionId: number) => void;
  activeOption: number | null;
  noGroup: boolean;
}

function DraggableOption({
  option,
  onOptionClick,
  activeOption,
  noGroup,
}: DraggableOptionProps) {
  const [, drag] = useDrag(() => ({
    type: "OPTION",
    item: { option },
  }));

  return (
    <div
      ref={drag}
      key={option.option_id}
      className={`flex items-end justify-center break-words border border-transparent text-center text-lg font-medium ${
        activeOption === option.option_id ? "bg-accent " : "bg-[#b7d6a3]"
      } duration-250 h-24 w-52 cursor-pointer pb-3 transition-colors  hover:border-black hover:bg-accent ${
        noGroup && "bg-destructive"
      }`}
      onClick={() => onOptionClick(option.option_id)}
    >
      <span>{option.user_friendly_option_name}</span>
    </div>
  );
}

export default DraggableOption;
