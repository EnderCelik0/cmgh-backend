import { Button } from "@/components/ui/button";
import { useAppContext } from "../context/AppContext";

export default function Sidebar() {
  const { page, handlePage } = useAppContext();

  return (
    <aside className="bg-slate-750  flex h-full w-48 flex-col  border-r-[1px] p-3 shadow-black shadow-sm "> 
      <section>
        <Button
          className={`mb-4 block w-full p-2 text-left hover:bg-accent  ${
            page === "products" && "bg-accent"
          }`}
          onClick={() => handlePage("products")}
        >
          Edit Products
        </Button>
      </section>
      <section>
        <Button
          className={`mb-4 block w-full p-2 text-left hover:bg-accent ${
            page === "rules" && "bg-accent"
          }`}
          onClick={() => handlePage("rules")}
        >
          Edit Rules
        </Button>
      </section>
      <section>
        <Button
          className={`mb-4 block w-full p-2 text-left hover:bg-accent ${
            page === "materials" && "bg-accent"
          }`}
          onClick={() => handlePage("materials")}
        >
          Edit Materials
        </Button>
      </section>
      <section className="mt-auto">
        <Button
          className={`block w-full p-2  text-left hover:bg-accent ${
            page === "settings" && "bg-accent"
          }`}
          onClick={() => handlePage("settings")}
        >
          Settings
        </Button>
      </section>
    </aside>
  );
}
