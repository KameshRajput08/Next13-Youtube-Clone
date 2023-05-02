"use client";

import { useTheme } from "next-themes";
import React, { useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import Modal from "./Modal";
import Input from "../Inputs/Input";
import Button from "../Inputs/Button";
import useRegisterModal from "../hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  const { isOpen, onClose } = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const register = useRegisterModal();
  const { theme } = useTheme();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSignIn(e) {
    e.preventDefault();
    setIsLoading(true);
    signIn("credentials", {
      ...loginData,
      redirect: false,
    }).then((callback) => {
      console.log(callback);
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        onClose();
        router.reload();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} theme={theme}>
      <div className={`w-full h-full sm:px-4 md:px-6 py-3 text-${theme}-text`}>
        <h1 className="text-xl md:text-2xl font-[600] leading-tight pt-4">
          Log in to your account
        </h1>

        <form className="mt-6" onSubmit={handleSignIn}>
          <Input
            type={"email"}
            name="email"
            id="loginEmail"
            label="Email"
            value={loginData.email}
            required={true}
            onChange={handleChange}
          />
          <Input
            type={"password"}
            name="password"
            id="loginPass"
            label="Password"
            value={loginData.password}
            onChange={handleChange}
            required={true}
            minlength={6}
          />
          <Button
            disabled={isLoading}
            type="submit"
            text="Log In"
            onClick={() => {}}
          />
        </form>
        <hr className={`my-6  w-full bg-${theme}-soft`} />

        <button
          className="group px-6 py-3 w-full border-[1px] border-border rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
          onClick={() => signIn("google")}
        >
          <div className="relative flex items-center space-x-4 justify-center">
            <Image
              width={50}
              height={45}
              src="/img/google.svg"
              className="absolute left-0 w-5"
              alt="google logo"
            />
            <span
              className={`block w-max font-semibold tracking-wide text-sm transition duration-300 group-hover:text-blue-600 sm:text-base`}
            >
              Continue with Google
            </span>
          </div>
        </button>

        <p className="mt-8 text-center">
          Don&apos;t have an account?&nbsp;
          <span
            onClick={() => {
              register.onOpen();
              onClose();
            }}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default Login;
