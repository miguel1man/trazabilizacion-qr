import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="flex w-full justify-center px-5 py-6 bg-white">
      <div className="flex items-center">
        <Image src="/images/fidelizame.svg" alt="logo" width={45} height={30} />
        <h1 className="pl-4 text-lg font-medium text-[#1A4F83]">Fidelizame</h1>
      </div>
      {/* <button
        className="text-white bg-primary rounded-md p-2"
        onClick={async () => {
          dispatch(connect());
        }}
      >
        Conectar a Wallet
      </button> */}
    </header>
  );
};
