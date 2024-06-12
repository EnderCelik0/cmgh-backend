import RuleProperties from "@/components/EditRule/RuleProperties";
import Rules from "@/components/EditRule/Rules";
import Wrapper from "@/components/Wrapper";

export default function EditRules() {
  return (
    <Wrapper>
      <section className="flex flex-col gap-2">
        <RuleProperties />
        <Rules />
      </section>
    </Wrapper>
  );
}
