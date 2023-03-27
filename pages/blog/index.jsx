import React, {useState, useEffect} from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function blog(props) {
  const { userInfo, currentUser } = useAuth();
  const router = useRouter();

  function handle() {
    // rediriger vers la page d'accueil
    router.push("/");
  }

  useEffect(()=>{
    newArticles()
  },[])

  const [state, setState] = useState([])
  //  Appel de l'API pour GET le contenu:
  const newArticles = ()=>{
    fetch('/api/articleAPI')
    .then(response => response.json())
    .then(data =>setState(data))
  }

  
  return (
    <div className=" items-center text-center text-gray-50">
      {/* <div>{array}</div> */}
      {currentUser ? (
        <div className="mb-8 mt-8 select-none sm:text-4xl text-13xl ">
          Bonjour
          <span className="text-orange-400"> {currentUser.email} </span>
        </div>
      ) : (
        <div className="mb-8 mt-8 select-none sm:text-4xl text-13xl ">
          Bonjour
          <span className="text-orange-400"> visiteur </span>
        </div>
      )}
      {currentUser ? (
        <button
          onClick={handle}
          className="hover:opacity-80  py-5 cursor-pointer  text-white inline-block bg-green-600 px-6 
          text-xs font-medium uppercase tracking-wide rounded-full
          shadow-md hover:bg-primary-600 focus:bg-primary-600
          focus:outline-none active:bg-primary-700 transition
          duration-150 ease-in-out"
        >
          Ecrire un article
        </button>
      ) : (
        <></>
      )}
      <div className="mt-8 select-none sm:text-6xl text-3xl ">
        Liste des articles
      </div>
      <div className="py-5 px-4">
        <p className="text-center">
          Voici les articles récupérés dans un fichier Json:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {state.map((article) => (
            <div key={article.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-neutral-700">
                <img
                  className="w-full h-48 object-cover object-center"
                  src={article.image}
                  alt={article.title}
                />
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-primary text-white px-2 py-1 text-xs font-semibold rounded-full uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="mb-3 text-xl font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                    {article.title}
                  </h2>
                  <p className="text-base text-neutral-600 dark:text-metal-200">
                    {article.body.slice(0, 20) + "..."}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/blog/${article.id.toString()}`}
                      className="inline-block hover:opacity-80 bg-green-600 text-white px-6 py-2
                    text-xs font-medium uppercase tracking-wide rounded-full
                    shadow-md hover:bg-primary-600 focus:bg-primary-600
                    focus:outline-none active:bg-primary-700 transition
                    duration-150 ease-in-out"
                    >
                      Lire la suite
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// export async function getStaticProps() {
//   const data = await import(`/data/articles.json`);
//   const articles = await data.default;

//   return {
//     props: {
//       articles,
//     },
//   };
// }
