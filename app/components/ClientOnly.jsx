"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

const ClientOnly = ({ children, page }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <SessionProvider>
        <ThemeProvider defaultTheme="dark" themes={["light", "dark"]}>
          {!hasMounted ? (
            page === undefined ? (
              <LoadingScreen />
            ) : null
          ) : (
            <>{children}</>
          )}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default ClientOnly;
