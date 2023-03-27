import { useAuth } from "@/context/AuthContext";
import React, { use, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
 
  const {login, signup, currentUser} = useAuth()
  console.log(currentUser)

  async function submitHandler() {
    if (!email || !passWord) {
      setError("Veuillez remplir les champs svp.");
      return;
    }
    if(isLoggingIn){
      try{
        await login(email, passWord)
      }
      catch(e){
        setError('Email ou mdp incorrecte')
      }
      return 
    }
    await signup(email, passWord)
    
  }

  return (
    <div className="gap-4 sm:gap-4 text-xs sm:text-sm flex-1 flex flex-col items-center justify-center">
      <h1 className="uppercase text-white select-none text-2xl sm:text-4xl font-extrabold">
        {isLoggingIn ? "Connexion" : "Inscription"}
      </h1>
      {/* Affichage du message erreur si elle est true: */}
      {error && (
        <div className="text-center border border-solid w-full  max-w-[40ch] py-2 text-rose-400 border-rose-400 ">
          {error}
        </div>
      )}
      {/* {error ?
        <div className="text-center border border-solid w-full  max-w-[40ch] py-2 text-rose-400 border-rose-400 ">
          {error}
        </div>
        :""} */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Adresse mail"
        className="duration-300 b-2 border-solid focus:border-cyan-300 border-b-[5px] border-white outline-none p-2 w-full max-w-[40ch] text-slate-900"
      />
      <input
        value={passWord}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Mot de passe"
        className="outline-none b-2 border-solid focus:border-cyan-300 border-b-[5px] border-white p-2 w-full max-w-[40ch] text-slate-900"
      />
      <button
        onClick={submitHandler}
        className="duration-500 hover:bg-white 
         relative 
        after:absolute after:top-0
        after:right-full after:bg-white
        after:z-10 after:w-full
        after:h-full
        overflow-hidden
        hover:after:translate-x-full
        after:duration-500 hover:text-slate-900
        text-white w-full max-w-[40ch] 
        border border-white 
        border-solid uppercase py-2 after:text-slate-900"
      >
        <h2 className="relative z-20">
          {isLoggingIn ? "Se connecter" : "S'inscrire"}
        </h2>
      </button>
      <h2
        className="text-white duration-300 hover:scale-110 cursor-pointer"
        onClick={() => setIsLoggingIn(!isLoggingIn)}
      >
        {!isLoggingIn ? "Se connecter" : "S'inscrire"}
      </h2>
    </div>
  );
}
