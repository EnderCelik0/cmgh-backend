import ProductEditor from "../components/EditProduct/ProductEditor";
import FeatureOptions from "@/components/EditProduct/FeatureOptions";
import FeatureProperties from "@/components/EditProduct/FeatureProperties";
import Features from "@/components/EditProduct/Features";
// import OptionProperties from "@/components/EditProduct/OptionProperties";

export default function Product() {
  return (
    <main className="flex gap-6 text-2xl">
      <section className="flex flex-col gap-2">
        <ProductEditor />
        <Features />
      </section>
      <FeatureOptions />
      <div>
        <FeatureProperties />
      </div>
    </main>
  );
}
