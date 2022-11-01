import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer/Footer";
import Script from "next/script";

const title = "Pallozzi estimate";
const description =
  "Pallozzi estimate is a web application that helps software developers and project managers estimate things that need to be developed";
const image = "https://pallozzi.spyna.it/pallozzi-estimate.png";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://estimate.spyna.it" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="description" content={description} />
        <meta name="apple-mobile-web-app-title" content={title} />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#14b8a6" />
        <meta name="theme-color" content="#14b8a6" />

        <meta property="og:url" content="https://estimate.spyna.it" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={"Pallozzi estiamte"} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="605" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SpinaLorenzo" />
        <meta name="twitter:creator" content="@SpinaLorenzo" />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:title" content={title}></meta>
        <meta name="twitter:description" content={description} />
      </Head>
      <Script
        async
        id="google-analytics-import"
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-EXH0YJK8QL"
      ></Script>
      <Script id="google-analytics" strategy="lazyOnload">
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EXH0YJK8QL');`}
      </Script>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
