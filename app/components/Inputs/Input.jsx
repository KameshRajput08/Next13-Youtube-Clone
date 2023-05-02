import { useTheme } from "next-themes";
import React from "react";

const Input = ({
  id,
  type,
  name,
  label,
  value,
  onChange,
  required,
  minLength,
}) => {
  const { theme } = useTheme();
  return (
    <div class="relative mb-6">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        required={required ? true : false}
        onChange={onChange}
        minLength={minLength}
        class={`block px-2.5 pb-1.5 pt-3 w-full text-sm text-${theme}-text bg-transparent rounded-lg border-[1px] appearance-none border-border focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
        placeholder=" "
      />
      <label
        for={id}
        class={`absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-${theme}-BgSoft px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
