import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="text-white py-3 flex justify-center items-center gap-6">
      <Link href="https://firebase.google.com/">
        <i className="cursor-pointer duration-300 hover:opacity-30 fa-solid fa-database"></i>
      </Link>
      <Link href="https://github.com/">
        <i className="cursor-pointer duration-300 hover:opacity-30 fa-brands fa-github"></i>
      </Link>
      <Link href="https://fr.reactjs.org/">
        <i className="cursor-pointer duration-300 hover:opacity-30 fa-brands fa-react"></i>
      </Link>
    </div>
  );
}
