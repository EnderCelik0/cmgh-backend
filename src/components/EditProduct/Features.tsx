import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Reorder } from "framer-motion";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [features, setFeatures] = useState([
    { id: 1, name: "table", value: "Results Detection" },
    { id: 2, name: "newProduct", value: "Random Rotor Speed" },
    { id: 3, name: "showAllFeatures", value: "Aurora" },
    { id: 4, name: "showAllFeatures1", value: "Halo" },
    { id: 5, name: "showAllFeatures2", value: "Number Sequence" },
    { id: 6, name: "showAllFeatures3", value: "Separators" },
    { id: 7, name: "showAllFeatures4", value: "Turret" },
    { id: 8, name: "showAllFeatures5", value: "Ball Stops" },
    { id: 9, name: "showAllFeatures6", value: "Centre Finish" },
    { id: 10, name: "showAllFeatures7", value: "Ball Track Finish" },
    { id: 11, name: "showAllFeatures8", value: "Top Rim Finish" },
    { id: 12, name: "showAllFeatures9", value: "Outer Bowl Finish" },
  ]);
  const [initialFeatures, setInitialFeatures] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      setInitialFeatures([...features]);
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

  const handleReorder = (newFeatures = []) => {
    setFeatures(newFeatures);
  };

  const saveFeatures = () => {
    setInitialFeatures([...features]);
    setIsSaveDisabled(true);
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
        <ul className="h-[600px] overflow-x-auto overflow-y-hidden p-1">
          {features.map((item) => (
            <Reorder.Item key={item.id} value={item}>
              <li className="reorder-handle flex flex-col">
                <Feature
                  key={item.name}
                  feature={item.value}
                  isActive={activeFeature === item.value}
                  onMouseDown={() => setActiveFeature(item.value)}
                />
              </li>
            </Reorder.Item>
          ))}
        </ul>
      </Reorder.Group>

      <div className="flex justify-between gap-2">
        <Button className="self-start">Add Feature</Button>
        <Button
          className=" self-start px-7"
          onClick={saveFeatures}
          disabled={isSaveDisabled}
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
