import RuleProperties from "@/components/EditRule/RuleProperties";
import Rules from "@/components/EditRule/Rules";

export default function EditRules() {
  return (
    <main className="flex gap-6 text-2xl">
      <section className="flex flex-col gap-2">
        <RuleProperties />
        <Rules />
      </section>
    </main>
  );
}
