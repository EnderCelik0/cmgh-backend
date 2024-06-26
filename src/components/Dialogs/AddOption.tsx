import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import axios from "axios";
import { Option, OptionGroup } from "@/types/types";

export function AddOptionDialog({
  featureName,
  onAddOption,
}: {
  featureName: string;
  onAddOption: () => void;
}) {
  const [newOption, setNewOption] = useState({ name: "", id: 0 });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (newOption.name.trim() !== "" && newOption.id !== 0) {
      try {
        setLoading(true);

        // Fetch the current feature data
        const response = await axios.get(
          `http://localhost:3000/${featureName}`,
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch current feature data.");
        }
        const featureData = response.data;

        // Check if an option with the same ID already exists
        const optionExists =
          featureData.no_group_options.some(
            (option: Option) => option.option_id === newOption.id,
          ) ||
          featureData.feature_option_groups.some((group: OptionGroup) =>
            group.options.some(
              (option: Option) => option.option_id === newOption.id,
            ),
          );

        if (optionExists) {
          toast.error("Option with the same ID already exists.", {
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
          setLoading(false);
          return;
        }

        // Update the no_group_options array
        const updatedNoGroupOptions = [
          ...featureData.no_group_options,
          {
            option_id: newOption.id,
            option_name: newOption.name,
            user_friendly_option_name: newOption.name,
            full_summary_name: `${newOption.name} ${featureName}`,
            thumbnail_size: "2x1",
            available_default: true,
            has_quantity_control: false,
            option_img: "", // Add the appropriate image path here
            disabled: false,
          },
        ];

        const updatedFeatureData = {
          ...featureData,
          no_group_options: updatedNoGroupOptions,
        };

        // Send the updated feature data back to the server
        const updateResponse = await axios.put(
          `http://localhost:3000/${featureName}`,
          updatedFeatureData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (updateResponse.status !== 200) {
          throw new Error("Failed to update the feature.");
        }

        console.log("Option added successfully!");
        setNewOption({ name: "", id: 0 });
        onAddOption();
        toast("Option added successfully!", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } catch (error) {
        console.error("Error adding feature:", error);
        toast("Failed to add feature.", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast("Option name and ID are required.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Option</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]">
        <DialogHeader>
          <DialogTitle>Add Option</DialogTitle>
          <DialogDescription>
            Add options to your features. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="featureName" className="text-right">
              Option Name
            </Label>
            <Input
              id="featureName"
              value={newOption.name}
              onChange={(e) =>
                setNewOption({ ...newOption, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Option ID
            </Label>
            <Input
              id="id"
              value={newOption.id}
              onChange={(e) =>
                setNewOption({
                  ...newOption,
                  id: parseInt(e.target.value) || 0,
                })
              }
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          {loading ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={handleSave}>Save changes</Button>
          )}
          <DialogClose asChild>
            <Button type="button" className="bg-destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
