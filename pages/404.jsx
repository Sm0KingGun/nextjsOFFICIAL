import React from "react";
import Image from "next/image";

export default function Erreur() {
  return (
    <div className="relative">
      <h1 className="sm:text-2xl text-[45px] text-emerald-400 text-center mt-[30px]">Erreur de chargement...</h1>
      <div className="w-full h-96">
        <Image
          className="object-contain h-full w-full mt-[200px]"
          alt="dino"
          src="/dino.png"
          layout="fill"
        />
      </div>
    </div>
  );
}
