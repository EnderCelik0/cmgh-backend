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

export default function FeatureProperties() {
  return (
    <div className="flex h-full flex-col justify-between rounded-md border-2 border-[#c3c3c3] p-3">
      <div className="flex flex-col gap-4">
        <h3>Feature Properties</h3>
        <div className="flex flex-col">
          <h4 className="text-base">User-Friendly Name</h4>
          <Input className="border border-[#c3c3c3]" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-base">Unique Name</h4>
          <Input className="border border-[#c3c3c3]" />
        </div>
        <SelectWithLabel />
        <CheckboxWithText labelText="Available by Default" />
        <TextareaWithLabel />
        <CheckboxWithText labelText="Disabled" />
      </div>

      <div className="flex w-full justify-end gap-4">
        <Button>Duplicate</Button>
        <Button>Save</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}

export function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Help Text</Label>
      <Textarea
        className="border border-[#c3c3c3]"
        placeholder="Type your message here."
        id="message"
        defaultValue=""
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
