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

export function AddGroupDialog({
  featureName,
  onAddGroup,
}: {
  featureName: string;
  onAddGroup: () => void;
}) {
  const [newGroup, setNewGroup] = useState({ name: "", id: 0 });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (newGroup.name.trim() !== "" && newGroup.id !== 0) {
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

        // Update the feature_option_groups array
        const updatedFeatureOptionGroups = [
          ...featureData.feature_option_groups,
          {
            option_group_id: newGroup.id,
            option_group_name: newGroup.name,
            options: [],
          },
        ];

        const updatedFeatureData = {
          ...featureData,
          feature_option_groups: updatedFeatureOptionGroups,
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

        console.log("Group added successfully!");
        setNewGroup({ name: "", id: 0 });
        onAddGroup();
        toast("Group added successfully!", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } catch (error) {
        console.error("Error adding group:", error);
        toast("Failed to add group.", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast("Group name and ID are required.", {
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
        <Button>Add Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]">
        <DialogHeader>
          <DialogTitle>Add Group</DialogTitle>
          <DialogDescription>
            Add groups to your features. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="groupName" className="text-right">
              Group Name
            </Label>
            <Input
              id="groupName"
              value={newGroup.name}
              onChange={(e) =>
                setNewGroup({ ...newGroup, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Group ID
            </Label>
            <Input
              id="id"
              value={newGroup.id}
              onChange={(e) =>
                setNewGroup({
                  ...newGroup,
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
