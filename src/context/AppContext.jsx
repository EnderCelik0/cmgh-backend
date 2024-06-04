import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
	const [page, setPage] = useState('rules');

	function handlePage(page) {
		setPage(page);
	}
	return (
		<AppContext.Provider
			value={{
				page,
				handlePage,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
