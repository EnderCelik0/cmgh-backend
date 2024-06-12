import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckboxWithText } from "@/components/EditProduct/ProductEditor";
import { Button } from "../ui/button";
import {
  InfoCircledIcon,
  Cross1Icon,
  Cross2Icon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import "../../styles/materialColorPicker.css";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";

interface Material {
  id: number;
  materialId: string;
  imagePath: string;
  user_friendly_name: string;
  unique_name: string;
  type: "Glossy" | "Matte";
  smoothness: number;
  baseMap: string | null;
  baseMapColor: string;
  normalMap: string | null;
  occlusionMap: string | null;
  emitionMap: string;
}

interface MaterialPropertiesProps {
  material: Material;
}

const MaterialProperties: React.FC<MaterialPropertiesProps> = ({
  material,
}) => {
  const [emissionColor, setEmissionColor] = useState<string>("");
  const [isEmitionOpen, setIsEmitionOpen] = useState(false);
  const [baseMapColor, setBaseMapColor] = useState<string>("");
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [normalImage, setNormalImage] = useState<string | null>(null);
  const [occlusionImage, setOcclusionImage] = useState<string | null>(null);
  const [baseMapSize, setBaseMapSize] = useState<string>("");
  const [normalImageSize, setNormalImageSize] = useState<string>("");
  const [occlusionImageSize, setOcclusionImageSize] = useState<string>("");
  const [baseMapName, setBaseMapName] = useState<string>("");
  const [normalMapName, setNormalMapName] = useState<string>("");
  const [occlusionMapName, setOcclusionMapName] = useState<string>("");

  const fileSize = (file: File) => {
    if (!file) return "File not selected";

    if (file.size > 1048576) {
      return `${(file.size / 1048576).toFixed(2)} MB`;
    }
    return `${(file.size / 1024).toFixed(2)} KB`;
  };

  const convertToBase64 = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "baseMap" | "normalMap" | "occlusionMap",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const result = e.target.result as string;
          const size = fileSize(file);
          const name = file.name;
          if (type === "baseMap") {
            setBaseImage(result);
            setBaseMapSize(size);
            setBaseMapName(name);
          } else if (type === "normalMap") {
            setNormalImage(result);
            setNormalImageSize(size);
            setNormalMapName(name);
          } else if (type === "occlusionMap") {
            setOcclusionImage(result);
            setOcclusionImageSize(size);
            setOcclusionMapName(name);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (type: "baseMap" | "normalMap" | "occlusionMap") => {
    if (type === "baseMap") {
      setBaseImage("");
      setBaseMapSize("");
      setBaseMapName("");
    } else if (type === "normalMap") {
      setNormalImage("");
      setNormalImageSize("");
      setBaseMapName("");
    } else if (type === "occlusionMap") {
      setOcclusionImage("");
      setOcclusionImageSize("");
      setOcclusionMapName("");
    }
  };

  return (
    <div className="h-max-full flex min-w-[530px] flex-col justify-between rounded-md border-2 border-[#c3c3c3]">
      <h3 className="p-2">Material Properties</h3>
      <div className="h-[600px] flex-col gap-4 overflow-auto overflow-x-hidden">
        <div className="flex flex-col px-1">
          <div className="gap mb-2 flex flex-col  px-1">
            <h4 className="text-base">User-Friendly Name</h4>
            <Input
              className="border border-[#c3c3c3]"
              value={material.user_friendly_name}
            />
          </div>
          <div className="mb-2 flex flex-col px-1">
            <h4 className="text-base">Unique Name</h4>
            <Input
              name="unique_name"
              className="border border-[#c3c3c3]"
              defaultValue={material.unique_name}
            />
          </div>
          <div className="mb-2 flex flex-col px-1">
            <h4 className="text-base">Material ID</h4>
            <Input
              name="materialId"
              className="border border-[#c3c3c3]"
              value={material.materialId}
            />
          </div>

          <div className="my-4 flex items-center gap-2 px-2">
            <h3 className="text-[13px]">Material Type</h3>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Material Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="glossy">Glossy</SelectItem>
                <SelectItem value="matte">Matte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-2 bg-slate-500 px-3 py-1 text-sm font-medium text-white ">
              Surface Inputs
            </h3>
            <div className="ml-auto mr-auto flex w-full items-center gap-10 p-2 text-[13px]">
              <div className="relative flex h-full flex-col justify-evenly rounded-md border-2 border-dashed border-slate-300 py-4 pl-4 pr-7  ">
                <div className="flex gap-4">
                  <div className="mb-2 flex items-center gap-1">
                    {baseImage ? (
                      <div className="flex cursor-pointer items-center gap-2">
                        <Cross1Icon
                          onClick={() => deleteImage("baseMap")}
                          className="h-4 w-4 text-destructive"
                        />
                        <img src={baseImage} className="mb-2 h-6 w-6" />
                      </div>
                    ) : (
                      <Input
                        id="baseMap"
                        type="file"
                        accept=".png, .jpg, .tiff"
                        className="h-6 w-6 cursor-pointer shadow"
                        onChange={(e) => convertToBase64(e, "baseMap")}
                      ></Input>
                    )}
                    <div className="absolute right-1 top-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoCircledIcon />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Supports only .jpg, .png, and .tiff</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Label htmlFor="baseMap" className="text-nowrap">
                      Base Map
                    </Label>
                    {baseMapSize ? (
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="w-20 overflow-hidden text-ellipsis whitespace-nowrap">
                                - {baseMapName}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{baseMapName}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <span>({baseMapSize})</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-2 flex w-full items-center gap-1">
                  {normalImage ? (
                    <div className="flex items-center gap-2">
                      <Cross1Icon
                        className="h-4 w-4 cursor-pointer text-destructive"
                        onClick={() => deleteImage("normalMap")}
                      />
                      <img src={normalImage} className="mb-2 h-6 w-6 " />
                    </div>
                  ) : (
                    <Input
                      id="normalMap"
                      type="file"
                      accept=".png, .jpg, .tiff"
                      className="h-6 w-6 cursor-pointer shadow"
                      onChange={(e) => convertToBase64(e, "normalMap")}
                    ></Input>
                  )}
                  <Label htmlFor="normalMap" className="text-nowrap ">
                    Normal Map
                  </Label>
                  {normalImageSize ? (
                    <div className="flex gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="w-20 overflow-hidden text-ellipsis whitespace-nowrap">
                              - {normalMapName}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{normalMapName}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span>({normalImageSize})</span>
                    </div>
                  ) : null}
                </div>
                <div className="mb-2 flex w-full items-center gap-1">
                  {occlusionImage ? (
                    <div className="flex items-center gap-2">
                      <Cross1Icon
                        className="h-4 w-4 cursor-pointer text-destructive"
                        onClick={() => deleteImage("occlusionMap")}
                      />
                      <img src={occlusionImage} className="mb-2 h-6 w-6 " />
                    </div>
                  ) : (
                    <Input
                      id="occlusionMap"
                      type="file"
                      accept=".png, .jpg, .tiff"
                      className="h-6 w-6 cursor-pointer shadow"
                      onChange={(e) => convertToBase64(e, "occlusionMap")}
                    ></Input>
                  )}
                  <Label htmlFor="occlusionMap" className="text-nowrap ">
                    Occlusion Map
                  </Label>
                  {occlusionImage ? (
                    <div className="flex gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="w-20 overflow-hidden text-ellipsis whitespace-nowrap">
                              - {occlusionMapName}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{occlusionMapName}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span>({occlusionImageSize})</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <ColorPicker
                  color={baseMapColor}
                  label="Base Color"
                  onChange={(color) => setBaseMapColor(color)}
                />
              </div>
            </div>
            <div className="flex flex-col px-2 text-[13px]">
              <h3>Smoothness</h3>
              <Slider
                defaultValue={[!material.smoothness ? 0 : material.smoothness]}
                max={1}
                step={0.01}
              />
              <h3 className="self-end">
                {/* {smoothness !== material.smoothness
                  ? smoothness
                  : material.smoothness} */}
              </h3>
            </div>
            <div
              className={` flex w-full ${
                !isEmitionOpen ? "justify-start" : "justify-between"
              } items-start gap-10 p-2 text-[13px] `}
            >
              <CheckboxWithText
                labelText="Emition"
                id="isEmitionOpen"
                textSize="13px"
                defaultChecked={isEmitionOpen}
                onChange={(e) => setIsEmitionOpen(e.target.checked)}
              />
              {isEmitionOpen && (
                <div>
                  <ColorPicker
                    color={emissionColor}
                    onChange={setEmissionColor}
                    label="Emition Color"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end gap-4 p-1">
        <Button>Duplicate</Button>
        <Button>Save</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default MaterialProperties;

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-nowrap">{label}</h3>
      <div className="small custom-pointers">
        <RgbaStringColorPicker color={color} onChange={onChange} />
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoCircledIcon className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Value must be in the format of rgba(r,g,b,a)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          onChange={(e) => onChange(e.target.value)}
          className="mt-2"
          placeholder="rgba(255,255,255, 1)"
          value={color}
        />
      </div>
    </div>
  );
}
