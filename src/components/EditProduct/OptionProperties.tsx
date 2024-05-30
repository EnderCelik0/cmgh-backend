import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckboxWithText } from "./ProductEditor";
import { Button } from "../ui/button";

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
}

interface OptionPropertiesProps {
  option: Option;
}

export default function OptionProperties({ option }: OptionPropertiesProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-md border-2 border-[#c3c3c3] p-3">
      <div className="flex flex-col gap-4">
        <h3>Option Properties</h3>
        <div className="flex flex-col">
          <h4 className="text-base">User-Friendly Name</h4>
          <Input
            className="border border-[#c3c3c3]"
            value={option.user_friendly_option_name}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-base">Full Summary Name</h4>
          <Input
            className="border border-[#c3c3c3]"
            value={option.full_summary_name}
          />
        </div>
        <img
          className="h-24 w-48 object-cover"
          src={option.option_img}
          alt="placeholder"
        />
        <SelectWithLabel thumbnailSize={option.thumbnail_size} />
        <CheckboxWithText
          labelText="Available by Default"
          checked={option.available_default}
          labelId="available-default-option"
          inputId="available-default-option"
        />
        <CheckboxWithText
          labelText="Has Quantity Control"
          checked={option.has_quantity_control}
          labelId="quantity-control"
          inputId="quantity-control"
        />

        <TextareaWithLabel imagePath={option.option_img} />
        <CheckboxWithText
          labelText="Disabled"
          checked={option.disabled}
          labelId="option-disabled"
          inputId="option-disabled"
        />
      </div>

      <div className="flex w-full justify-end gap-4">
        <Button>Duplicate</Button>
        <Button>Save</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}

function TextareaWithLabel({ imagePath }: { imagePath: string }) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="path">Image Path</Label>
      <Textarea
        className="min-h-10 border border-[#c3c3c3]"
        placeholder="Type your path here."
        id="path"
        value={imagePath}
      />
    </div>
  );
}

function SelectWithLabel({ thumbnailSize }: { thumbnailSize: string }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-base">Thumbnail Size</h4>
      <Select>
        <SelectTrigger className="w-[180px] border border-[#c3c3c3]">
          <SelectValue placeholder={thumbnailSize} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1x1">1x1</SelectItem>
          <SelectItem value="2x1">2x1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
