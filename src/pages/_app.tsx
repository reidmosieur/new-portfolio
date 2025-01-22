import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import "../app/globals.css";
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <title>Reid Mosieur | Full Stack Dev</title>
        <meta
          name="description"
          content="Hi, I'm Reid, a full stack developer ready to do what it takes to increase conversions, user retention, and reduce the cost of development.Hi, I'm a full stack developer ready to increase conversions, retention, and reduce the cost of development without losing usability, security, or performance."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="Reid Mosieur | Full Stack Dev" />
        <meta property="og:url" content={"https://www.reidmosieur.dev"} />
        <meta property="og:site_name" content="Reid Mosieur" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content={
            "https://www.reidmosieur.dev/reid-mosieur-full-stack-developer.png"
          }
        />
        <meta
          property="og:image:secure_url"
          content={
            "https://www.reidmosieur.dev/reid-mosieur-full-stack-developer.png"
          }
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-9872893344828688"
        ></meta>
      </Head>
      <main>
        <div className="w-full min-h-screen">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;