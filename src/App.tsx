import Sidebar from "./components/SideBar";
import EditProduct from "./pages/Product";
import EditRules from "./pages/EditRules";
import Settings from "./pages/Settings";
import { Toaster } from "sonner";
import EditMaterials from "./pages/EditMaterials";
import { useAppContext } from "./context/AppContext";

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
    <div className=" flex h-dvh gap-10 bg-slate-100">
      <Sidebar />
      <div className="bg-slate-100 py-2">{renderSelectedComponent()}</div>
      <Toaster />
    </div>
  );
};

export default App;
