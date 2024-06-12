import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipWrapperProps {
  content: string | ReactNode;
  fileName?: boolean;
  fileNameText?: string;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  content,
  fileName = false,
  fileNameText = "",
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {fileName ? (
            <div className="w-20 overflow-hidden text-ellipsis whitespace-nowrap">
              - {fileNameText}
            </div>
          ) : (
            <InfoCircledIcon className="cursor-pointer" />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
