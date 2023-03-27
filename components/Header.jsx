import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Link from "next/link";

export default function Header() {
  //  On définit deux états initiaux et openModal est initialisé à false:
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* opérateur ternaire pour afficher la fenêtre modale si openModal est vrai */}
      {openModal && <Modal setOpenModal={setOpenModal} />}
      {/* Si openModal = true, on rend le composant Modal en appelant la fonction setOpenModal en tant que prop */}

      <div className="bg-slate-900 flex items-center justify-between p-4 sticky top-0 w-full left-0 border-solid border-b border-white">
        <Link
          href="/blog"
          className="duration-300 hover:scale-110 cursor-pointer"
        >
          <img width={60} heigth={60} src="/logo.png" alt="logo" />
        </Link>
        <h1 className="select-none sm:text-6xl text-3xl text-gray-50 ">
          LE BLOG
        </h1>
        {/* On déclenche setOpenModal qui devient true si on appuie sur l'icône: */}
        <i
          onClick={() => setOpenModal(true)}
          className="cursor-pointer duration-300 hover:opacity-40 sm:text-3xl text-gray-50 text-3xl fa-solid fa-user hover:fa-beat}"
        ></i>
      </div>
    </>
  );
}
