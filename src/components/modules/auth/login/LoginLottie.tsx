"use client";
import Lottie from "lottie-react";
import loginLottie from "@/assets/lotties/login.json";

const LoginLottie = () => {
  return (
    <div>
      <Lottie
        animationData={loginLottie}
        loop={true}
        className="max-w-lg w-full px-4 pt-3"
      />
    </div>
  );
};

export default LoginLottie;
