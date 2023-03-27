/*
Ce dode définit un composant React "AuthProvider" qui crée un 
contexte d'authentification ("AuthContext") et fournit des 
fonctions pour s'inscrire, se connecter et se déconnecter d'un 
service d'authentification Firebase.
*/
//  Importation React et les hooks useContext, useState, useEffect et useRef:
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  createContext,
} from "react";

//  Importation des instances auth et db de Firebase:
import { auth, db } from "../firebase";
//  Importation des fonctions Firebase nécessaires pour l'authentification type mail/password:
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
//  Importation pour accéder à la db :
import { doc, getDoc } from "firebase/firestore";

//  Création d'un contexte d'authentification appelé "AuthContext":
const AuthContext = React.createContext();

//  Exportation d'une fonction useAuth() qui renvoie le contexte
//  d'authentification "AuthContext" grace au hook useContext.
export function useAuth() {
  return useContext(AuthContext);
}

/*
Exportation d'un composant AuthProvider qui définit trois états :
- currentUser (l'utilisateur actuel)
- loading (indicateur de chargement)
- userInfo (informations sur l'utilisateur, qui n'est pas initialisé pour le moment).
*/
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();
  /*
  Définition de trois fonctions pour s'inscrire, se connecter et 
  se déconnecter. Les fonctions utilisent les fonctions Firebase 
  correspondantes pour gérer l'authentification.
  */
  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    return;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }
  /*
    Utilise le hook useEffect pour exécuter une fonction qui ajoute 
    un écouteur d'événements Firebase lors du montage du composant.
    Lorsque l'utilisateur se connecte ou se déconnecte, la fonction 
    met à jour l'état currentUser et le chargement.
  */
  useEffect(() => {
    const nonInscrit = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return nonInscrit;
  }, []); // fonction exécutée qu'une seule fois
  useEffect(() => {
    const nonInscrit = onAuthStateChanged(auth, async (user) => {
      setCurrentUser((prevState) => user);
      setLoading(false);
    });
    return nonInscrit;
  }, []);

  /*
  Crée un objet "value" qui contient les états currentUser et 
  userInfo, ainsi que les fonctions login, signup et logout.
  */
  const value = {
    currentUser,
    login,
    signup,
    logout,
    userInfo,
  };

  /*
  Renvoie un composant qui enveloppe ses enfants avec le contexte 
  d'authentification "AuthContext.Provider" et fournit les valeurs 
  currentUser, login, signup et logout dans la valeur du contexte.
  Lorsque le chargement est terminé, le composant enfants est rendu, 
  sinon rien n'est rendu.
  */
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
