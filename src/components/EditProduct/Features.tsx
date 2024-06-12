import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Reorder } from "framer-motion";
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
import { useAppContext } from "../../context/AppContext";
import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { toast } from "sonner";

interface FeatureItem {
  id: number;
  name: string;
  value: string;
}

export default function Features() {
  const { activeFeature, setActiveFeature } = useAppContext();
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [initialFeatures, setInitialFeatures] = useState<FeatureItem[]>([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      fetchFeatures();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const isFeaturesChanged =
      JSON.stringify(features) !== JSON.stringify(initialFeatures);
    setIsSaveDisabled(!isFeaturesChanged);
  }, [features, initialFeatures]);

  const handleReorder = (newFeatures: FeatureItem[] = []) => {
    setFeatures(newFeatures);
  };

  const saveFeatures = () => {
    setInitialFeatures([...features]);
    setIsSaveDisabled(true);
  };

  const addFeatures = async () => {
    setIsSaveDisabled(false);
    await fetchFeatures();
  };

  const fetchFeatures = async () => {
    try {
      const response = await axios.get("http://localhost:4000/features");
      if (response.status === 200) {
        const data = response.data;
        setFeatures(data);
        setInitialFeatures(data);
      } else {
        throw new Error("Error fetching features.");
      }
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  return (
    <div className="flex w-full flex-col rounded-md border-2 border-[#c3c3c3] p-2">
      <h3 className="mb-4 text-base">Product Features:</h3>
      <Reorder.Group
        axis="y"
        values={features}
        onReorder={handleReorder}
        layoutScroll
      >
        <ul className="overflow-y h-[600px] overflow-x-auto p-1">
          {features.map((item) => (
            <Reorder.Item key={item.id} value={item}>
              <li className="reorder-handle flex flex-col">
                <Feature
                  key={item.id}
                  feature={item.name}
                  isActive={activeFeature.name === item.name}
                  onMouseDown={() => setActiveFeature(item)}
                />
              </li>
            </Reorder.Item>
          ))}
        </ul>
      </Reorder.Group>

      <div className="flex justify-between gap-2">
        <AddFeatureDialog onAddFeature={fetchFeatures} />
        <Button
          onClick={saveFeatures}
          disabled={isSaveDisabled}
          className="self-start"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function Feature({
  feature,
  isActive,
  onMouseDown,
}: {
  feature: string;
  isActive: boolean;
  onMouseDown: () => void;
}) {
  return (
    <Button
      className={`flex justify-center ${
        isActive ? "bg-accent" : "bg-background"
      } rounded-md border border-blue-500  py-[6px] text-base  font-medium text-black transition-colors duration-150  hover:cursor-pointer hover:bg-accent disabled:bg-blue-400 disabled:text-white`}
      onMouseDown={onMouseDown}
    >
      {feature}
    </Button>
  );
}

export function AddFeatureDialog({
  onAddFeature,
}: {
  onAddFeature: () => void;
}) {
  const [newFeature, setNewFeature] = useState({ name: "", id: 0 });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (newFeature.name.trim() !== "" && newFeature.id !== 0) {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/features", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeature),
        });
        if (response.ok) {
          console.log("Feature added successfully!");
          setNewFeature({ name: "", id: 0 });
          onAddFeature();
          toast("Feature added successfully!", {
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
        } else {
          console.error("Failed to add feature.");
          toast("Failed to add feature.", {
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
        }
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
      toast("Feature name and ID are required.", {
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
            <Button onClick={handleSave}>Save changes</Button>
          )}
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
