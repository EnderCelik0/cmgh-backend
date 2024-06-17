// AddFeatureDialog.tsx
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { handleSave } from "@/api/handle-save.ts";

interface AddFeatureDialogProps {
  onAddFeature: () => void;
}

interface NewFeature {
  name: string;
  id: number;
}

export function AddFeatureDialog({ onAddFeature }: AddFeatureDialogProps) {
  const [newFeature, setNewFeature] = useState<NewFeature>({ name: "", id: 0 });
  const [loading, setLoading] = useState(false);

  const saveFeature = async () => {
    setLoading(true);
    await handleSave(
      "http://localhost:4000/features",
      newFeature,
      "Feature",
      () => {
        setNewFeature({ name: "", id: 0 });
        onAddFeature();
      },
    );
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Feature</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]">
        <DialogHeader>
          <DialogTitle>Add Feature</DialogTitle>
          <DialogDescription>
            Add features to your product. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="featureName" className="text-right">
              Feature Name
            </Label>
            <Input
              id="featureName"
              value={newFeature.name}
              onChange={(e) =>
                setNewFeature({ ...newFeature, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Feature ID
            </Label>
            <Input
              id="id"
              value={newFeature.id}
              onChange={(e) =>
                setNewFeature({
                  ...newFeature,
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
            <Button onClick={saveFeature}>Save changes</Button>
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
