import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Reorder } from "framer-motion";

export default function Rules() {
  const [activeRule, setActiveRule] = useState<string | null>(null);
  const [rules, setRules] = useState([
    {
      id: 1,
      name: "table",
      value: "Results Detection Changes",
      disabled: true,
    },
    {
      id: 2,
      name: "newProduct",
      value: "Random Rotor Speed Changes",
      disabled: true,
    },
    { id: 3, name: "rules", value: "Aurora Changes", disabled: true },
    { id: 4, name: "rules1", value: "Halo Changes", disabled: false },
    { id: 5, name: "rules2", value: "Number Sequence Changes", disabled: true },
    { id: 6, name: "rules3", value: "Separators Changes", disabled: false },
    { id: 7, name: "rules4", value: "Turret Changes", disabled: true },
    { id: 8, name: "rules5", value: "Ball Stops Changes", disabled: true },
    { id: 9, name: "rules6", value: "Centre Finish Changes", disabled: true },
    {
      id: 10,
      name: "rules7",
      value: "Ball Track Finish Changes",
      disabled: true,
    },
    { id: 11, name: "rules8", value: "Top Rim Finish Changes", disabled: true },
    {
      id: 12,
      name: "rules9",
      value: "Outer Bowl Finish Changes",
      disabled: false,
    },
  ]);

  const [initialRules, setInitialRules] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      setInitialRules([...rules]);
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const isRulesChanged =
      JSON.stringify(rules) !== JSON.stringify(initialRules);
    setIsSaveDisabled(!isRulesChanged);
  }, [rules, initialRules]);

  const handleReorder = (newRules = []) => {
    setRules(newRules);
  };

  const saveFeatures = () => {
    setInitialRules([...rules]);
    setIsSaveDisabled(true);
  };

  return (
    <div className="flex w-full flex-col rounded-md border-2 border-[#c3c3c3] p-2">
      <h3 className="mb-2 text-base">Rules:</h3>
      <Reorder.Group
        axis="y"
        values={rules}
        onReorder={handleReorder}
        layoutScroll
      >
        <ul className="h-[600px] overflow-x-auto overflow-y-hidden p-1">
          {rules.map((item) => (
            <Reorder.Item key={item.id} value={item}>
              <li className="reorder-handle flex flex-col">
                <Rule
                  key={item.name}
                  feature={item.value}
                  isActive={activeRule === item.value}
                  onMouseDown={() => setActiveRule(item.value)}
                />
              </li>
            </Reorder.Item>
          ))}
        </ul>
      </Reorder.Group>

      <div className="flex justify-between gap-2">
        <Button className="self-start">New Rule</Button>
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

function Rule({
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
      className={`flex justify-center rounded-md border border-black/40  py-[6px] text-left  text-base font-medium text-black transition-colors duration-150  hover:cursor-pointer hover:bg-accent disabled:bg-blue-400 disabled:text-white ${isActive ? "bg-accent" : "bg-[hsl(45,100%,85%)]"}  `}
      onMouseDown={onMouseDown}
    >
      {feature}
    </Button>
  );
}
