import Sidebar from "./components/SideBar";
import EditProduct from "./pages/Product";
import EditRules from "./pages/EditRules";
import Settings from "./pages/Settings";
import { Toaster } from "sonner";
import EditMaterials from "./pages/EditMaterials";
import { useAppContext } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const { page } = useAppContext();

  const renderSelectedComponent = () => {
    switch (page) {
      case "products":
        return <EditProduct />;
      case "rules":
        return <EditRules />;
      case "materials":
        return <EditMaterials />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className=" flex h-dvh gap-10 bg-slate-100">
        <Sidebar />
        <div className="bg-slate-100 py-2">{renderSelectedComponent()}</div>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
};

export default App;
