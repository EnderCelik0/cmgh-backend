import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RuleProperties() {
  return (
    <section className="flex min-w-96 flex-col  gap-2 rounded-md border-2 border-[#c3c3c3]/80 p-3">
      <div className="flex gap-6">
        <h1 className="whitespace-nowrap text-2xl">Rule Properties</h1>
      </div>

      <div className="flex flex-col">
        <h4 className="text-base">Rule Name</h4>
        <Input className="border border-[#c3c3c3]" />
      </div>

      <div className="flex justify-between">
        <CheckboxWithText
          labelText="Disabled"
          inputId="rule-disabled"
          labelId="rule-disabled"
          checked={false}
        />
        <div className="flex gap-2">
          <Button className="rounded-md bg-[#cfcfcf] px-4 py-1 text-base text-black hover:border-black hover:bg-[#cfcfcf]/70 ">
            Save
          </Button>
          <Button className="rounded-md bg-[#cfcfcf] px-4 py-1 text-base text-black hover:border-black hover:bg-[#cfcfcf]/70 ">
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
}

export function CheckboxWithText({
  labelText,
  inputId,
  labelId,
}: {
  labelText: string;
  inputId: string;
  labelId: string;
  checked: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <input
        className="text-accent-500 focus:ring-accent-500 peer h-6 w-6  border border-[#c3c3c3]"
        type="checkbox"
        id={inputId}
      />

      <label
        htmlFor={labelId}
        className="font-ligh text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {labelText}
      </label>
    </div>
  );
}
