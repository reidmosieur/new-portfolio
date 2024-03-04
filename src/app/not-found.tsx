import Link from "next/link";
import links from "../data/links.json"
import 'tailwindcss/tailwind.css';
import "../app/globals.css";

const Page = () => {
    return (
        <html lang="en">
          <head>
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                rel="stylesheet"
              />
          </head>
          <body>
            <main>
                <div className="min-h-screen px-1 flex flex-col flex-wrap content-center justify-center gap-4 lg:gap-8 text-white" >
                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold" >Let&apos;s get you back on track shall we?</h1>
                    <div className="w-fit mx-auto flex flex-col md:flex-row flex-wrap divide-y-2 md:divide-x-2 divide-stone-700" >
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
          </body>
        </html>
    )
}

export default Page;