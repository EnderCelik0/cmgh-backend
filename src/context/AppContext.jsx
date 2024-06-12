import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [page, setPage] = useState("materials");
  const [activeFeature, setActiveFeature] = useState({});

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
