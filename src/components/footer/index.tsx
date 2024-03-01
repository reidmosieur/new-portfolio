import Link from "next/link";

import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { TiSocialLinkedin } from "react-icons/ti";
import links from "../../data/links.json"

const Footer = () => {
    const internalLinks = links.internals;

    const socials = [
        {
            href: 'https://github.com/reidmosieur',
            icon: <FiGithub className="my-auto" />,
            text: 'reidmosieur',
        },
        {
            href: 'https://twitter.com/ReidMosieur',
            icon: <FaXTwitter className="my-auto" />,
            text: '@ReidMosieur',
        },
        {
            href: 'https://www.linkedin.com/in/reidmosieur/',
            icon: <TiSocialLinkedin className="my-auto" />,
            text: 'reidmosieur',
        },
    ]

    return (
        <div className="w-full max-w-7xl my-2 mx-auto py-12 px-8 flex flex-row flex-wrap justify-center gap-12 border-t-4 border-stone-900" >
            <div className="columns-1 space-y-2" >
                <span className="font-bold" >Pages</span>
                {internalLinks.map(link => <Link key={link.text} href={link.href} className="block hover:underline hover:text-stone-200 hover:animate-pulse" >{link.text}</Link>)}
            </div>
            <div className="columns-1 space-y-2" >
                <span className="font-bold" >Socials</span>
                {socials.map(link => <Link key={link.text} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-stone-200 hover:animate-pulse flex flex-nowrap gap-2" >{link.icon}{link.text}</Link>)}
            </div>
        </div>
    )
};

export default Footer;