// Features.tsx
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Reorder } from "framer-motion";
import { fetchFeatures, FeatureItem } from "@/api/fetch-features";
import { useAppContext } from "../../context/AppContext";
import { AddFeatureDialog } from "../Dialogs/AddFeature";
import axios from "axios";
import { toast } from "sonner";

export default function Features() {
  const { activeFeature, setActiveFeature } = useAppContext();
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [initialFeatures, setInitialFeatures] = useState<FeatureItem[]>([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      loadFeatures();
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

  const saveFeatures = async () => {
    try {
      await axios.put(
        "http://localhost:4000/features",
        { features },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setInitialFeatures([...features]);
      setIsSaveDisabled(true);
      console.log("Features updated successfully!");
      toast.success("Features updated successfully!", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      toast.error("Failed to update features.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      console.error("Error saving features:", error);
    }
  };

  const loadFeatures = async () => {
    try {
      const data = await fetchFeatures();
      setFeatures(data);
      setInitialFeatures(data);
    } catch (error) {
      console.error("Error loading features:", error);
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
        <AddFeatureDialog onAddFeature={loadFeatures} />
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
