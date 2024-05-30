import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProductEditor() {
  return (
    <section className="flex flex-col gap-2 rounded-md border-2 border-[#c3c3c3]/80 p-3">
      <div className="flex gap-6">
        <h1 className="whitespace-nowrap">Edit Product:</h1>
        <SelectProductDropdown />
      </div>

      <div className="flex flex-col">
        <h4 className="text-base">Product Name</h4>
        <Input className="border border-[#c3c3c3]" />
      </div>

      <div className="flex justify-between">
        <CheckboxWithText
          labelText="Disabled"
          inputId="product-disabled"
          labelId="product-disabled"
        />
        <div className="flex gap-4">
          <Button className="rounded-md bg-[#cfcfcf] px-4 py-1 text-base text-black hover:border-black hover:bg-[#cfcfcf]/70 ">
            Save
          </Button>
          <Button className="rounded-md bg-[#cfcfcf] px-4 py-1 text-base text-black hover:border-black hover:bg-[#cfcfcf]/70 ">
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
}

function SelectProductDropdown() {
  return (
    <Select>
      <SelectTrigger className="w-[180px] border border-[#c3c3c3]">
        <SelectValue placeholder="Product" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="table">Table Display</SelectItem>
        <SelectItem value="newProduct">[Add New Product]</SelectItem>
        <SelectItem value="showAllFeatures">[Show All Features]</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function CheckboxWithText({
  labelText,
  inputId,
  labelId,
  checked,
}: {
  labelText: string;
  inputId: string;
  labelId: string;
  checked: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <input
        className="text-accent-500 focus:ring-accent-500 peer h-6 w-6  border border-[#c3c3c3]"
        type="checkbox"
        id={inputId}
        checked={checked}
      />

      <label
        htmlFor={labelId}
        className="font-ligh text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {labelText}
      </label>
    </div>
  );
}
