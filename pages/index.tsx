import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Layout/Header";
import PallozziStage from "../components/PallozziStage/PallozziStage";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pallozzi Estimate</title>
        <meta name="description" content="A tool for estimate work" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
          <PallozziStage />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
