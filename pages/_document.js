import { Html, Head, Main, NextScript, About } from "next/document";
import { NextSeo } from "next-seo";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Kindness Campaign" />

        <meta
          property="og:title"
          content=" Kindness Campaign"
          class="yoast-seo-meta-tag"
        />
        <meta
          property="og:description"
          content="Kindness Campaign ! The Kindness Campaign creates local leaders, involved community members, engaged businesses and at-promise young adults through leadership of impact initiatives."
          class="yoast-seo-meta-tag"
        />
        <meta property="og:url" content="https://kindness-omega.vercel.app/" />
        <meta property="og:site_name" content="Kindness Campaign" />
        <meta
          property="article:modified_time"
          content="2023-09-18T05:45:43+00:00"
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="413" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
