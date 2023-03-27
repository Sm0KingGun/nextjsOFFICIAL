import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

//  Fonction Modal qui accepte un objet props en entrée:
export default function Modal(props) {
  //  On extrait la fonction setOpenModal des props:
  const { setOpenModal } = props;
  //  On définit deux états initiaux:
  const [_document, set_document] = useState(null);
  const { logout } = useAuth();
  const { userInfo, currentUser } = useAuth();
  const router = useRouter();

  function handle() {
    // rediriger vers la page d'accueil
    router.push("/");
  }
  //  On utilise useEffect pour exécuter la fonction set_document
  //  avec l'objet document en paramètre lors de l'affichage du
  //  composant:
  useEffect(() => {
    set_document(document);
  }, []);

  //  On vérifie si _document est null, si c'est le cas, on ne renvoie rien:
  if (!_document) {
    return null;
  }

  //  On utilise ReactDOM.createPortal pour créer un portail React
  //  pour afficher la fenêtre modale, qui est un élément fixe de fond
  //  blanc prenant tout l'espace:
  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col">
      <div className="flex items-center justify-between border-b border-solid border-slate-900 p-4">
        <h1 className="font-extrabold text-2xl sm:text-5xl select-none">
          LE BLOG
        </h1>
        <i
          onClick={() => props.setOpenModal(false)}
          className="fa-solid fa-xmark duration-300 hover:rotate-90 text-lg sm:text-3xl cursor-pointer"
        ></i>
      </div>
      {currentUser ? (
        <div className="p-4 flex flex-col gap-3">
          <Link href="/">
            <h2
              onClick={() => {
                logout();
                props.setOpenModal(false);
              }}
              className="select-none duration-300 hover:pl-2 cursor-pointer"
            >
              Se déconnecter
            </h2>
          </Link>
        </div>
      ) : (
        <div className="p-4 flex flex-col gap-3">
          <Link href="/">
            <h2
              onClick={() => {
                props.setOpenModal(false);
                {handle}
              }}
              className="select-none duration-300 hover:pl-2 cursor-pointer"
            >
              S'inscrire
            </h2>
          </Link>
        </div>
      )}
    </div>,
    _document.getElementById("portal")
  );
}
/*
La méthode createPortal de ReactDOM permet de déplacer des noeuds d'un
endroit à un autre de l'arborescence.

La variable _document est utilisée pour stocker une référence à l'objet
document qui a accès à l'élément DOM portal.
Ce dernier est utilisé pour placer le composant Modal en dehors de son
parent direct et le faire flotter sur le dessus de la page.

En somme, les Portals permettent de créer des composants de type Modal 
qui s'affichent par-dessus un composant parent sans affecter la 
structure DOM. Ils offrent une solution élégante et efficace pour 
gérer les interactions utilisateur complexes tout en maintenant une 
structure DOM propre et cohérente.
*/
