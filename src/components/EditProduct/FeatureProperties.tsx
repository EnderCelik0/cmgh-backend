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

interface FeatureData {
  feature_id: number;
  feature_name: string;
  user_friendly_feature_name: string;
  unique_name: string;
  available_default: boolean | undefined;
  feature_description: string;
  disabled: boolean | undefined;
}

export default function FeatureProperties({
  activeFeatureData,
}: {
  activeFeatureData: FeatureData | null;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-md border-2 border-[#c3c3c3] p-3">
      <div className="flex flex-col gap-4">
        <h3>Feature Properties</h3>
        <div className="flex flex-col">
          <h4 className="text-base"> User-Friendly Name</h4>
          <Input
            className="border border-[#c3c3c3]"
            value={activeFeatureData?.user_friendly_feature_name || ""}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-base">Unique Name</h4>
          <Input
            className="border border-[#c3c3c3]"
            value={activeFeatureData?.unique_name || ""}
          />
        </div>
        <SelectWithLabel />
        <CheckboxWithText
          textSize="13px"
          labelText="Available by Default"
          id="available-default-feature"
          defaultChecked={activeFeatureData?.available_default || undefined}
        />
        <TextareaWithLabel
          helpText={activeFeatureData?.feature_description || ""}
          id="feature-description"
        />
        <CheckboxWithText
          textSize="13px"
          labelText="Disabled"
          id="feature-disabled"
          defaultChecked={activeFeatureData?.disabled || undefined}
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

export function TextareaWithLabel({
  helpText,
  id,
}: {
  helpText: string;
  id: string | undefined;
}) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={id}>Help Text</Label>
      <Textarea
        className="border border-[#c3c3c3]"
        placeholder="Type your message here."
        id={id}
        value={helpText}
      />
    </div>
  );
}

function SelectWithLabel() {
  return (
    <div className="flex flex-col">
      <h4 className="text-base">Type</h4>
      <Select>
        <SelectTrigger className="w-[180px] border border-[#c3c3c3]">
          <SelectValue placeholder="Select One" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="table">Select Item 1</SelectItem>
          <SelectItem value="newProduct">Select Item 2 </SelectItem>
          <SelectItem value="showAllFeatures">Select Item 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
