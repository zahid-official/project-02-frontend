"use client";
import Lottie from "lottie-react";
import registerLottie from "@/assets/lotties/register.json";

const RegisterLottie = () => {
  return (
    <div>
      <Lottie
        animationData={registerLottie}
        loop={true}
        className="max-w-lg w-full px-6 pt-38"
      />
    </div>
  );
};

export default RegisterLottie;
