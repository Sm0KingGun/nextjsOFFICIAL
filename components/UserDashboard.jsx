import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";

export default function UserDashboard() {
  const titleInput = useRef();
  const userIdInput = useRef();
  const bodyInput = useRef();
  const imageInput = useRef();
  const [error, setError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    // Ajouter les données à votre fichier JSON
    const newArticle = {
      userId: userIdInput.current.value,
      id: 4,
      image: imageInput.current.value,
      title: titleInput.current.value,
      body: bodyInput.current.value,
    };

    // const userId = req.body.userIdInput;
    // const id = req.body.idInput;
    // const image = req.body.imageInput;
    // const title = req.body.titleInput;
    // const body = req.body.bodyInput;
    // console.log(newArticle);
    // if (
    //   !title.current.value ||
    //   !user.current.value ||
    //   !texte.current.value ||
    //   !image.current.value
    // ) {
    //   setError("Veuillez remplir les champs svp.");
    //   return;
    // }

    fetch("/api/articleAPI", {
      method: "POST",
      body: JSON.stringify(newArticle),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    userIdInput.current.value = "";
    imageInput.current.value = "";
    titleInput.current.value = "";
    bodyInput.current.value = "";
  };

  return (
    <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5">
      {error && (
        <div className=" w-full max-w-[65ch] text-xs sm:text-sm mx-auto  gap-3 sm:gap-5 text-center border border-solid py-2 text-rose-400 border-rose-400 ">
          {error}
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div className="flex items-stretch">
          <input
            type="text"
            placeholder="Titre"
            className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
            ref={titleInput}
            // onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-stretch">
          <input
            type="text"
            placeholder="Auteur"
            className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
            ref={userIdInput}
            // onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="flex items-stretch">
          <textarea
            ref={bodyInput}
            // onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Texte"
            className="pb-80 outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
          />
        </div>
        <div className="flex items-stretch">
          <input
            type="text"
            placeholder="URL image"
            className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
            ref={imageInput}
            // onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button
          className="
        w-full max-w-[65ch] text-xs sm:text-sm mx-auto 
        duration-500 hover:bg-white 
         relative 
        after:absolute after:top-0
        after:right-full after:bg-white
        after:z-10 after:w-full
        after:h-full
        overflow-hidden
        hover:after:translate-x-full
        after:duration-500 hover:text-slate-900
        text-white 
        border border-white 
        border-solid uppercase py-2 after:text-slate-900"
        >
          {" "}
          <h2 className="relative z-20">Envoyer</h2>
        </button>
      </form>
    </div>
  );
}
