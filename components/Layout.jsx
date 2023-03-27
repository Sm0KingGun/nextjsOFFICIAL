import React  from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen relative bg-slate-900 flex-1">
      <Header />
      <main className="p-4 flex-col flex flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}
