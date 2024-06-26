import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [page, setPage] = useState("demo");
  const [activeFeature, setActiveFeature] = useState({});
  const [selectedItem, setSelectedItem] = useState({
    id: 2,
    name: "B",
    color: "bg-blue-400",
    number: 2,
  });

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <AppContext.Provider
      value={{
        page,
        handlePage,
        activeFeature,
        setActiveFeature,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
