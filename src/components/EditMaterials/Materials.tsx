import { useEffect, useState } from "react";
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
import axios from "axios";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import MaterialProperties from "./MaterialProperties";

interface MaterialItem {
  id: number;
  materialId: string;
  imagePath: string;
  unique_name: string;
  user_friendly_name: string;
  type: "Glossy" | "Matte";
  smoothness: number;
  baseMap?: string;
  baseMapColor?: string;
  normalMap?: string;
  occlusionMap?: string;
  emitionColor?: string;
}

export default function Materials() {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(
    null,
  );

  const handleReorder = (newFeatures: MaterialItem[] = []) => {
    setMaterials(newFeatures);
  };

  const fetchFeatures = async () => {
    try {
      const response = await axios.get("http://localhost:5000/materials");
      if (response.status === 200) {
        const data = response.data;
        setMaterials(data);
      } else {
        throw new Error("Error fetching materials.");
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const deleteMaterial = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/materials/${id}`,
      );
      if (response.status === 200) {
        console.log("Material deleted successfully!");
        toast("Material deleted successfully!", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        fetchFeatures();
        setActiveMaterial(null);
      } else {
        console.error("Failed to delete material.");
        toast("Failed to delete material.", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
    } catch (error) {
      console.error("Error deleting material:", error);
      toast("Failed to delete material.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleMaterialClick = (material: MaterialItem | null) => {
    setActiveMaterial(material === activeMaterial ? null : material);
  };

  return (
    <>
      <section className="flex gap-4">
        <div className="flex w-[400px] min-w-full flex-col rounded-md border-2 border-[#c3c3c3] p-2">
          <h3 className="mb-4 text-base">Product Features:</h3>
          <Reorder.Group
            axis="y"
            values={materials}
            onReorder={handleReorder}
            layoutScroll
          >
            <ScrollArea className="h-[600px]  px-2">
              {materials.map((item) => (
                <Reorder.Item key={item.id} value={item}>
                  <li className="reorder-handle flex flex-col">
                    <Material
                      key={item.id}
                      material={item}
                      isActive={activeMaterial?.id === item.id}
                      onClick={() => handleMaterialClick(item)}
                    />
                  </li>
                </Reorder.Item>
              ))}
            </ScrollArea>
          </Reorder.Group>

          <div className="flex justify-between gap-2">
            <AddFeatureDialog onAddMaterial={fetchFeatures} />
            <Button
              disabled={!activeMaterial?.id}
              className="self-start transition-all duration-300 hover:scale-110"
              onClick={() => deleteMaterial(activeMaterial?.id || 0)}
            >
              Delete Material
            </Button>
          </div>
        </div>
      </section>
      {activeMaterial ? <MaterialProperties material={activeMaterial} /> : null}
    </>
  );
}

function Material({
  material,
  isActive,
  onClick,
}: {
  material: MaterialItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className={`flex justify-center ${
        isActive ? "bg-accent" : "bg-background"
      } mr-1 rounded-md border  border-blue-500 text-base font-medium text-black transition-colors duration-150 hover:cursor-pointer hover:bg-accent disabled:bg-blue-400 disabled:text-white`}
    >
      {material.user_friendly_name}
      {material.user_friendly_name?.includes("(")
        ? ""
        : ` - (${material.type})`}
    </Button>
  );
}

export function AddFeatureDialog({
  onAddMaterial,
}: {
  onAddMaterial: () => void;
}) {
  const [newMaterial, setNewMaterial] = useState({ name: "", id: "" });
  const [loading, setLoading] = useState(false);

  const addMaterial = async () => {
    if (newMaterial.name.trim() !== "" && newMaterial.id !== "") {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/materials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMaterial),
        });
        if (response.ok) {
          setNewMaterial({ name: "", id: "" });
          toast("Material added successfully!", {
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
          onAddMaterial();
        } else {
          toast("Failed to add material.", {
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
        }
      } catch (error) {
        toast("Failed to add material.", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast("Material name and ID are required.", {
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
        <Button>Add Material</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]">
        <DialogHeader>
          <DialogTitle>Add Material</DialogTitle>
          <DialogDescription>
            Add materials to your product. Click add material when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="materialName" className="text-right">
              Material Name
            </Label>
            <Input
              id="materialName"
              value={newMaterial.name || ""}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Material ID
            </Label>
            <Input
              id="id"
              value={newMaterial.id || ""}
              placeholder="Must be a name. Can contain (- , _ )"
              onChange={(e) =>
                setNewMaterial({
                  ...newMaterial,
                  id: e.target.value,
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
            <Button onClick={addMaterial}>Save changes</Button>
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
