import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/store";
import "@/styles/globals.css";
import "@/styles/eventpages.css";
import "@/styles/Home.module.css";
import "@/styles/admin.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useEffect, useState } from "react";

let persistor = persistStore(store);

export default function MyApp({ Component, pageProps }) {
  const [data, setData] = useState("");

  useEffect(() => {
    const newsData = localStorage.getItem("N-d");
    if (newsData) {
      setData(newsData);
      localStorage.removeItem("N-d");
    }
  });
  return (
    <>
      <Head>
        <meta name="description" content={data.news_artical} />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.BASE_LIVE_URL + "news/" + data?.id}
        />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content="/logo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={process.env.BASE_LIVE_URL + "news/" + data?.id}
        />
        <meta property="twitter:title" content={data?.title} />
        <meta property="twitter:description" content={data.description} />
        <meta property="twitter:image" content="/logo.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={process.env.BASE_LIVE_URL + "news/" + data?.id}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600,300"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.cdnfonts.com/css/myriad-pro"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/images/logo.png" />

        {/* <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />  */}
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
