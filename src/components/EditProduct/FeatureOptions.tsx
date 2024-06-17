import { useEffect, useState } from "react";
import OptionProperties from "@/components/EditProduct/OptionProperties";
import Loader from "../Loader";
import { useAppContext } from "../../context/AppContext";
import FeatureProperties from "./FeatureProperties";
import { toast } from "sonner";
import axios from "axios";
import { AddOptionDialog } from "../Dialogs/AddOption";
import { AddGroupDialog } from "../Dialogs/AddGroup";
import { Reorder } from "framer-motion";

interface FeatureData {
  feature_id: number;
  feature_name: string;
  user_friendly_feature_name: string;
  unique_name: string;
  available_default: boolean;
  feature_description: string;
  disabled: boolean;
  feature_option_groups: OptionGroup[];
  no_group_options: Option[];
}

interface OptionGroup {
  option_group_id: number;
  option_group_name: string;
  options: Option[];
}

interface Option {
  option_id: number;
  option_name: string;
  user_friendly_option_name: string;
  full_summary_name: string;
  thumbnail_size: string;
  available_default: boolean;
  has_quantity_control: boolean;
  option_img: string;
  disabled: boolean;
  option_group_id: number;
}

export default function FeatureOptions() {
  const { activeFeature } = useAppContext();

  const [data, setData] = useState<FeatureData | null>(null);
  const [activeOption, setActiveOption] = useState<number | null>(null);
  const [activeFeatureData, setActiveFeatureData] =
    useState<FeatureData | null>(null);
  const [draggingOver, setDraggingOver] = useState<number | null>(null);

  const getOptionGroups = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/${activeFeature.value}`,
      );
      const featureData = response.data;
      setData(featureData);
      setActiveFeatureData(featureData);
    } catch (error) {
      console.error("Failed to fetch option groups:", error);
    }
  };

  useEffect(() => {
    if (activeFeature.value) {
      getOptionGroups();
      setActiveOption(null); // Resetting active option to null
    }
  }, [activeFeature.value]);

  const handleOptionClick = (optionId: number) => {
    setActiveOption(optionId === activeOption ? null : optionId); // Toggling active option
  };

  const moveOptionToGroup = async (
    option: Option,
    targetGroup: OptionGroup | null,
  ) => {
    if (!data) return; // Ensure data is not null

    // Check if the option is being moved to the same group
    const currentGroup = data.feature_option_groups.find((group) =>
      group.options.some((o) => o.option_id === option.option_id),
    );

    if (currentGroup?.option_group_id === targetGroup?.option_group_id) {
      return; // Option is being moved to the same group, do nothing
    }

    // Check if any item with the same ID already exists in the target group
    if (
      targetGroup &&
      targetGroup.options.some((o) => o.option_id === option.option_id)
    ) {
      toast.error(
        "Option with the same ID already exists in the target group.",
        {
          action: {
            label: "Close",
            onClick: () => {},
          },
        },
      );
    }

    // Remove the option from all groups and no_group_options
    const updatedGroups = data.feature_option_groups.map((group) => {
      if (group.option_group_id === targetGroup?.option_group_id) {
        // Add the option to the target group
        return { ...group, options: [...group.options, option] };
      } else {
        // Remove the option from other groups
        return {
          ...group,
          options: group.options.filter(
            (o) => o.option_id !== option.option_id,
          ),
        };
      }
    });

    const updatedNoGroupOptions = targetGroup
      ? data.no_group_options.filter((o) => o.option_id !== option.option_id)
      : [...data.no_group_options, option];

    // Check if there are any changes
    const isGroupChanged =
      data.feature_option_groups.some((group, index) => {
        return (
          group.option_group_id === targetGroup?.option_group_id &&
          group.options.length !== updatedGroups[index].options.length
        );
      }) || data.no_group_options.length !== updatedNoGroupOptions.length;

    if (!isGroupChanged) {
      return;
    }

    const updatedData: FeatureData = {
      ...data,
      feature_option_groups: updatedGroups,
      no_group_options: updatedNoGroupOptions,
    };

    setData(updatedData);

    // Send the updated data to the server
    try {
      const response = await axios.put(
        `http://localhost:3000/${activeFeature.value}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to update the feature.");
      }

      console.log("Feature updated successfully!");
      toast("Feature updated successfully!", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      console.error("Error updating feature:", error);
      toast("Failed to update feature.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    option: Option,
  ) => {
    e.dataTransfer.setData("option", JSON.stringify(option));
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetGroup: OptionGroup | null,
  ) => {
    e.preventDefault();
    const option = JSON.parse(e.dataTransfer.getData("option")) as Option;
    moveOptionToGroup(option, targetGroup);
    setDraggingOver(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (groupId: number | null) => {
    groupId === null ? setDraggingOver(null) : setDraggingOver(groupId);
  };

  const handleDragLeave = () => {
    setDraggingOver(null);
  };

  return (
    <div className="flex gap-7">
      <div className="flex h-full flex-col justify-between gap-6 rounded-md border-2 border-[#c3c3c3] p-2">
        {data?.feature_option_groups ? (
          <div>
            <h3 className="mb-4">Options for {activeFeature.name}</h3>
            <div className="flex max-h-[760px] flex-col gap-8 overflow-auto overflow-x-hidden p-2 shadow-md">
              {data.feature_option_groups.map((group) => (
                <div
                  key={group.option_group_id}
                  className="flex flex-col gap-1"
                >
                  <h3 className="px-1 text-base">{group.option_group_name}</h3>
                  <Reorder.Group
                    axis="y"
                    values={group.options}
                    onReorder={setData}
                  >
                    <div
                      key={group.option_group_id}
                      onDrop={(e) => handleDrop(e, group)}
                      onDragOver={handleDragOver}
                      onDragEnter={() => handleDragEnter(group.option_group_id)}
                      onDragLeave={handleDragLeave}
                      className={`grid grid-cols-[min-content_2fr] gap-6 border-2 border-[#70ad47] p-2 ${
                        draggingOver === group.option_group_id
                          ? "rounded-md border-dashed"
                          : "border-solid "
                      }`}
                    >
                      {group.options.map((option) => (
                        <Reorder.Item
                          key={option.option_id}
                          value={option}
                          initial={{ height: "auto", opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            key={option.option_id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, option)}
                            className={`flex items-end justify-center break-words border border-transparent text-center text-lg font-medium ${
                              activeOption === option.option_id
                                ? "bg-accent "
                                : "bg-[#b7d6a3]"
                            } duration-250 h-24 w-52 cursor-pointer pb-3 hover:border-black hover:bg-accent ${
                              false && "bg-destructive"
                            }`}
                            onClick={() => handleOptionClick(option.option_id)}
                          >
                            <span>{option.user_friendly_option_name}</span>
                          </div>
                        </Reorder.Item>
                      ))}
                    </div>
                  </Reorder.Group>
                </div>
              ))}
              {data.no_group_options && (
                <div className="flex flex-col gap-1">
                  <h3 className="px-1 text-base">No Group Options</h3>
                  <Reorder.Group
                    axis={undefined}
                    values={data.no_group_options}
                    onReorder={setData}
                  >
                    <div
                      onDrop={(e) => handleDrop(e, null)}
                      onDragOver={handleDragOver}
                      onDragEnter={() => handleDragEnter(null)}
                      onDragLeave={handleDragLeave}
                      className={`relative grid h-auto grid-cols-[min-content_2fr] gap-6 border-2 border-destructive p-2 ${
                        draggingOver === null
                          ? "rounded-md border-dashed "
                          : "border-solid"
                      }`}
                    >
                      {data.no_group_options.map((option) => (
                        <Reorder.Item key={option.option_id} value={option}>
                          <div
                            key={option.option_id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, option)}
                            className={`flex items-end justify-center break-words border border-transparent text-center text-lg font-medium  ${
                              activeOption === option.option_id
                                ? "bg-accent "
                                : "bg-[#b7d6a3]"
                            } duration-250 } h-24 w-52 cursor-pointer bg-destructive  pb-3 transition-colors hover:border-black
                  hover:bg-accent`}
                            onClick={() => handleOptionClick(option.option_id)}
                          >
                            <span>{option.user_friendly_option_name}</span>
                          </div>
                        </Reorder.Item>
                      ))}
                    </div>
                  </Reorder.Group>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-base">
            No Groups or Options
          </div>
        )}

        <div className="flex  justify-end gap-4">
          <AddOptionDialog
            featureName={activeFeature.value}
            onAddOption={getOptionGroups}
          />
          <AddGroupDialog
            featureName={activeFeature.value}
            onAddGroup={getOptionGroups}
          />
        </div>
      </div>

      {data && activeOption !== null ? (
        <OptionProperties
          option={
            data.feature_option_groups
              ?.flatMap((group) => group.options)
              .find((option) => option.option_id === activeOption) || {
              option_id: -1,
              option_name: "",
              user_friendly_option_name: "",
              full_summary_name: "",
              thumbnail_size: "",
              available_default: false,
              has_quantity_control: false,
              option_img: "",
              disabled: false,
              option_group_id: -1,
            }
          }
        />
      ) : (
        <FeatureProperties activeFeatureData={activeFeatureData} />
      )}
    </div>
  );
}
