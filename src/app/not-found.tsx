import Link from "next/link";
import links from "../data/links.json"
import 'tailwindcss/tailwind.css';
import "../app/globals.css";
import { Analytics } from "@vercel/analytics/react"

const Page = () => {
    return (
        <html lang="en">
          <head>
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                rel="stylesheet"
              />
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
              <link rel="manifest" href="/site.webmanifest"></link>
              <title>Reid Mosieur | Full Stack Dev</title>
              <meta name="description" content="Hi, I'm Reid, a full stack developer ready to do what it takes to increase conversions, user retention, and reduce the cost of development.Hi, I'm a full stack developer ready to increase conversions, retention, and reduce the cost of development without losing usability, security, or performance." />
              <meta property="og:locale" content="en_US" />
              <meta property="og:title" content="Reid Mosieur | Full Stack Dev" />
              <meta property="og:url" content={"https://www.reidmosieur.dev"} />
              <meta property="og:site_name" content="Reid Mosieur" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta property="og:image" content={'https://www.reidmosieur.dev/reid-mosieur-full-stack-developer.png'} />
              <meta property="og:image:secure_url" content={'https://www.reidmosieur.dev/reid-mosieur-full-stack-developer.png'} />
          </head>
          <body>
            <main>
                <div className="min-h-screen px-1 flex flex-col flex-wrap content-center justify-center gap-4 lg:gap-8 text-white" >
                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold" >Let&apos;s get you back on track shall we?</h1>
                    <div className="w-fit mx-auto flex flex-col md:flex-row flex-wrap divide-y-2 md:divide-y-0 md:divide-x-2 divide-stone-700" >
                        {links.internals.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="sm:text-xl lg:text-2xl px-2 md:px-4 hover:underline hover:animate-pulse"
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Analytics />
          </body>
        </html>
    )
}

export default Page;