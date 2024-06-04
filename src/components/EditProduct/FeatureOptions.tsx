import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import OptionProperties from "@/components/EditProduct/OptionProperties";
import Loader from "../Loader";

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
}

interface OptionGroup {
  option_group_id: number;
  option_group_name: string;
  options: Option[];
}

interface FeatureData {
  feature_id: number;
  feature_name: string;
  user_friendly_feature_name: string;
  unique_name: string;
  available_default: boolean;
  feature_description: string;
  disabled: boolean;
  feature_option_groups: OptionGroup[];
}

export default function FeatureOptions() {
  const [data, setData] = useState<FeatureData | null>(null);
  const [activeOption, setActiveOption] = useState<number | null>(null);

  function getOptionGroups() {
    fetch("http://localhost:3000/number_sequence").then((res) =>
      res.json().then((data: FeatureData) => setData(data)),
    );
  }

  useEffect(() => {
    getOptionGroups();
  }, []);

  const handleOptionClick = (optionId: number) => {
    setActiveOption(optionId === activeOption ? null : optionId);
  };

  return (
    <div className="flex gap-7">
      <div className="flex h-full flex-col justify-between gap-6 rounded-md border-2 border-[#c3c3c3] p-2">
        {data ? (
          <div>
            <h3 className="mb-4">
              Options for {data.user_friendly_feature_name}
            </h3>
            <div className="flex max-h-[760px] flex-col gap-8 overflow-auto overflow-x-hidden p-2 shadow-md">
              {data.feature_option_groups.map((group) => (
                <fieldset
                  key={group.option_group_id}
                  className="grid grid-cols-[min-content_2fr] gap-6 border-2 border-[#70ad47] p-2 "
                >
                  <legend className="px-1 text-base">
                    {group.option_group_name}
                  </legend>
                  {group.options.map((option) => (
                    <div
                      key={option.option_id}
                      className={`flex items-end justify-center break-words border border-transparent text-center text-lg font-medium ${
                        activeOption === option.option_id
                          ? "bg-accent "
                          : "bg-[#b7d6a3]"
                      } duration-250 h-24 w-52 cursor-pointer pb-3 transition-colors  hover:border-black hover:bg-accent`}
                      onClick={() => handleOptionClick(option.option_id)}
                    >
                      <span>{option.user_friendly_option_name}</span>
                    </div>
                  ))}
                </fieldset>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        )}

        <div className="flex w-full justify-end gap-4">
          <Button>Add Option</Button>
          <Button>Add Group</Button>
        </div>
      </div>
      {data &&
        data.unique_name === "number_sequence" &&
        activeOption !== null && (
          <OptionProperties
            option={
              data.feature_option_groups
                .flatMap((group) => group.options)
                .find((option) => option.option_id === activeOption) || {}
            }
          />
        )}
    </div>
  );
}
