'use client';

import { useTheme } from "next-themes";
import React from "react";

const Icon = ({ IconType, size, onClick }) => {
  const { theme } = useTheme();
  return (
    <IconType
      size={size}
      className={`cursor-pointer text-${theme}-text`}
      onClick={onClick}
    />
  );
};

export default Icon;
