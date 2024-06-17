import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductEditor() {
  const { activeFeature } = useAppContext();

  const [productName, setProductName] = useState("");

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const deleteFeature = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/features/${activeFeature.id}`,
      );
      if (response.status === 200) {
        console.log("Feature deleted successfully!");
        toast("Feature deleted successfully!", {
          description:
            "Be able to see the changes in the product plase refresh the page.",
          action: {
            label: "Refresh",
            onClick: () => {
              window.location.reload();
            },
          },
        });
      } else {
        console.error("Failed to delete feature.");
        toast("Failed to delete feature.", {
          description:
            "Feature might be deleted but the changes might not be visible. Please refresh the page.",
          action: {
            label: "Refresh",
            onClick: () => {
              window.location.reload();
            },
          },
        });
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
      toast("Failed to delete feature.", {
        description:
          "Feature might be deleted but the changes might not be visible. Please refresh the page.",
        action: {
          label: "Refresh",
          onClick: () => {
            window.location.reload();
          },
        },
      });
    }
  };

  return (
    <section className="flex flex-col gap-2 rounded-md border-2 border-[#c3c3c3]/80 p-3">
      <div className="flex items-center gap-6">
        <h1 className="whitespace-nowrap">Edit Product:</h1>
        <SelectProductDropdown onChange={handleProductNameChange} />
      </div>

      <div className="flex flex-col">
        <h4 className="text-base">Product Name</h4>
        <Input
          type="input"
          value={productName}
          className="border border-[#c3c3c3]"
        />
      </div>

      <div className="flex justify-between">
        <CheckboxWithText
          textSize="13px"
          labelText="Disabled"
          id="product-disabled"
          defaultChecked={true}
        />
        <div className="flex gap-4">
          <Button className="rounded-md bg-[#cfcfcf] px-4 py-1 text-base text-black hover:border-black hover:bg-[#cfcfcf]/70 ">
            Save
          </Button>
          <Button
            className="rounded-md bg-[#cfcfcf] px-4 py-1 text-base text-black hover:border-black hover:bg-[#cfcfcf]/70 "
            onClick={deleteFeature}
          >
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
}

function SelectProductDropdown({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px] border border-[#c3c3c3]">
        <SelectValue placeholder="Product" />
      </SelectTrigger>
      <SelectContent onChange={onChange}>
        <SelectItem value="table">Table Display</SelectItem>
        <SelectItem value="newProduct">[Add New Product]</SelectItem>
        <SelectItem value="showAllFeatures">[Show All Features]</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function CheckboxWithText({
  labelText,
  id,
  defaultChecked,
  textSize,
  onChange,
}: {
  labelText?: string | undefined;
  id: string;
  defaultChecked?: boolean | undefined;
  textSize?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <input
        className="text-accent-500 focus:ring-accent-500 peer h-6 w-6  border border-[#c3c3c3]"
        type="checkbox"
        id={id}
        checked={defaultChecked || undefined}
        onChange={onChange}
      />

      {labelText && (
        <label
          htmlFor={id}
          className={`leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  text-[${textSize}] `}
        >
          {labelText}
        </label>
      )}
    </div>
  );
}
