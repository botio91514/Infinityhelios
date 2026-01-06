import { createContext, useContext, useState, useCallback, useMemo } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);

    const showLoader = useCallback(() => setLoadingCount((prev) => prev + 1), []);
    const hideLoader = useCallback(() => setLoadingCount((prev) => Math.max(0, prev - 1)), []);

    const isLoading = loadingCount > 0;

    const value = useMemo(() => ({
        isLoading,
        showLoader,
        hideLoader
    }), [isLoading, showLoader, hideLoader]);

    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
