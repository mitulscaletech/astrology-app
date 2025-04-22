// context/LoaderContext.tsx
"use client";

import { createContext, useContext, useState } from "react";
import GlobalLoader from "@/components/ui/loader";

const LoaderContext = createContext({
  loading: false,
  setLoading: (_: boolean) => {}
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <GlobalLoader />}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
