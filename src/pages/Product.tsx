import ProductEditor from "../components/EditProduct/ProductEditor";
import FeatureOptions from "@/components/EditProduct/FeatureOptions";
import Features from "@/components/EditProduct/Features";
import Wrapper from "@/components/Wrapper";


export default function Product() {
  return (
    <Wrapper>
      <section className="flex flex-col gap-2">
        <ProductEditor />
        <Features />
      </section>
      <FeatureOptions />
    </Wrapper>
  );
}
