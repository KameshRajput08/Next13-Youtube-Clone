'use client'

import { useTheme } from "next-themes";

const Hr = () => {
  const { theme } = useTheme();
  return (
    <hr
      className={`my-5 mx-1 ${theme !== "light" ? "bg-darksoft" : "bg-soft"}`}
    />
  );
};

export default Hr;
