import React from "react";

export default function article(props) {
  console.log(props);
  return (
    <div className="text-white px-4 pt-5">
      <h1 className="py-6 select-none sm:text-6xl text-3xl font-bold text-center mb-4">
        {props.article.title}
      </h1>
      <p className="sm:text-3xl text-10xl mb-4">{props.article.body}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.article;
  const data = await import(`../../data/articles.json`);
  const articles = await data.default;
  const article = articles.find((item) => item.id === parseInt(id));

  return {
    props: {
      article,
    },
  };
}

export async function getStaticPaths() {
  const data = await import(`../../data/articles.json`);
  const articles = await data.default;

  const paths = articles.map((item) => ({
    params: { article: item.id.toString() },
  }));

  return {
    paths,
    fallback: blocking,
  };
}
