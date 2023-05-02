"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // if (!hasMounted) return <LoadingScreen />;

  return (
    <>
      <SessionProvider>
        <ThemeProvider defaultTheme="dark" themes={["light", "dark"]}>
          {!hasMounted ? <LoadingScreen /> : <>{children}</>}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default ClientOnly;
