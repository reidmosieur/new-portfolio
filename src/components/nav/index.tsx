import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgMenu, CgMenuRight} from "react-icons/cg";
import links from '../../data/links.json'
import ContactMe from "../contactMe";

const pathStyler = (path: string, currentPath: string) => {
    if (path === currentPath) {
        return 'text-orange-500 underline';
    } else if (path !== '/' && currentPath.includes(path)) {
        return 'text-orange-500 underline';
    }
}

const Nav = () => {
    const router = useRouter();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const internalLinks = links.internals;

    return (
        <>
            <div className={`sticky md:hidden top-0 z-30 w-full px-2 py-2 bg-black flex flex-col flex-wrap ${hamburgerOpen && 'border-b-4 border-stone-900'}`} >
                <button className="w-fit ml-auto" onClick={() => setHamburgerOpen(!hamburgerOpen)} >
                    <span className="sr-only">Open Menu</span>
                    {hamburgerOpen ? <CgMenuRight className="w-8 h-8" /> : <CgMenu className="w-8 h-8" />}
                </button>
                {hamburgerOpen &&
                    <nav className="w-full flex flex-col flex-wrap gap-4" >
                        <ul>
                            {internalLinks.map((link) => (
                                <li
                                    key={link.text}
                                    className={`${pathStyler(link.href, router.asPath)} hover:underline hover:text-stone-200 hover:animate-pulse`}
                                >
                                    <Link href={link.href}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                            <span
                                className="mt-1 flex flex-nowrap gap-2 font-bold"
                            >
                                Contact Me
                                <ContactMe />
                            </span>
                        </ul>
                    </nav>
                }
            </div>
            <nav className="hidden w-full max-w-7xl my-2 mx-auto py-2.5 px-8 sticky top-2 z-20 bg-stone-900 rounded-full md:flex md:flex-nowrap md:gap-8 border border-stone-900">
                <ul className="mx-auto flex flex-nowrap gap-4 my-auto list-none">
                    {internalLinks.map((link) => (
                        <li
                            key={link.text}
                            className={`${pathStyler(link.href, router.asPath)} hover:underline hover:text-stone-200 hover:animate-pulse`}
                        >
                            <Link href={link.href}>
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ContactMe />
            </nav>
        </>
    );
}

export default Nav;