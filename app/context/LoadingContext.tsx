"use client";
import { createContext, useState } from "react";
import { LoadingContextType } from "../utils/interfaces";
export const LoadingContext = createContext<LoadingContextType | null>(null);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadingState, setLoadingState] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
