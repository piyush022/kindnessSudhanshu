import { Html, Head, Main, NextScript, About } from "next/document";
import { NextSeo } from "next-seo";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <NextSeo
          title={data?.title}
          description={data.description}
          canonical="https://kindness-omega.vercel.app"
          openGraph={{
            url: `https://kindness-omega.vercel.app`,
            title: {},
            description: {},
            images: [
              {
                url: "/logo.png",
                width: 800,
                height: 600,
                alt: "Og Image Alt",
                type: "image/jpeg",
              },
              {
                url: "/logo.png",
                width: 900,
                height: 800,
                alt: "Og Image Alt Second",
                type: "image/jpeg",
              },
            ],
            siteName: "KindnessCampaign",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
