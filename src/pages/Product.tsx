import ProductEditor from "../components/EditProduct/ProductEditor";
import FeatureOptions from "@/components/EditProduct/FeatureOptions";
import Features from "@/components/EditProduct/Features";
import Wrapper from "@/components/Wrapper";
import { useAppContext } from "../context/AppContext";

export default function Product() {
  const { activeFeature } = useAppContext();

  return (
    <Wrapper>
      <section className="flex flex-col gap-2">
        <ProductEditor />
        <Features />
      </section>
      {activeFeature ? <FeatureOptions /> : null}
    </Wrapper>
  );
}
