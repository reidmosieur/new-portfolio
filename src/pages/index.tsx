import AboutMe from "@/components/aboutMe";
import TypewriterHero from "@/components/hero/typewriterHero";
import GamesContainer from "../components/games/components/container";
import { CinemjoiContextProvider } from "../components/cinemoji/context/cinemojiStateProvider";
import GameStateProvider from "../components/worcl/context/gameStateProvider";
import Tag from "@/components/tag";
import { FaCode, FaFileCode, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiExpress, SiMongodb, SiPostgresql } from "react-icons/si";
import Layout from "@/layout/main";
import MySpotify from "@/components/mySpotify";
import MyMovies from "@/components/myMovies";
import { SampleCodeContextProvider } from "@/components/sample/context/samplesStateProvider";
import Link from "next/link";
import pageData from "../data/index.json"
import ContactMe from "@/components/contactMe";
import Image from "next/image";

const tagIconClasses = "h-4 w-4 my-auto"

const tags = [
    {
        name: 'React',
        icon: <FaReact className={tagIconClasses} />
    },
    {
        name: 'NodeJS',
        icon: <FaNodeJs className={tagIconClasses} />
    },
    {
        name: 'Express',
        icon: <SiExpress className={tagIconClasses} />
    },
    {
        name: 'MongoDB',
        icon: <SiMongodb className={tagIconClasses} />
    },
    {
        name: 'Postgresql',
        icon: <SiPostgresql className={tagIconClasses} />
    },
    {
        name: 'Programmatic SEO',
        icon: <FaFileCode className={tagIconClasses} />
    },
    {
        name: 'Python',
        icon: <FaPython className={tagIconClasses} />
    }
];

const Page = () => {
    const {
        translations,
        aboutMeBlocks,
    } = pageData;

    return (
        <Layout>
            <SampleCodeContextProvider>
                <div className="mx-auto flex flex-col flex-wrap gap-8" >
                    <section className="w-full max-w-prose mx-auto flex flex-col flex-wrap gap-4" >
                        <TypewriterHero 
                            typewriterProps={{
                                textArray: translations,
                                displayDuration: 2000,
                                typingSpeed: 150,
                                deletingSpeed: 100,
                                loops: 1,
                            }}
                        />
                        <div className="flex flex-wrap gap-2" >
                            {tags.map((tag, index) => (
                                <Tag key={index} tagType="primary">
                                    {tag.name}
                                    {tag.icon}
                                </Tag>
                            ))}
                        </div>
                        <div className="flex flex-col-reverse flex-wrap gap-4 md:block" >
                            <Image className="md:max-w-72 md:float-right md:ml-6 rounded-md" src={'/ReidMosieur.JPEG  '} alt={'An image of a handsome, charming developer named Reid Mosieur ;)'} width={1536} height={2048} />
                            {aboutMeBlocks.blockOne.map((aboutMeText, index) => (
                                <AboutMe 
                                    key={index}
                                    aboutMeText={aboutMeText}
                                    extraClasses="md:my-2"
                                />
                            ))}
                        </div>
                        <p className="flex flex-nowrap gap-2" >Click these to check out the actual code for what you&apos;re looking at <FaCode className="text-orange-400 my-auto" /></p>
                        <small>Want to get straight into things with some of my projects? Check out my latest project and the thought process behind it <Link href="/my-work/hello-async" className="text-teal-600 underline" >here</Link>.</small>
                    </section>
                    <CinemjoiContextProvider>
                        <GameStateProvider>
                            <GamesContainer />
                        </GameStateProvider>
                    </CinemjoiContextProvider>
                    <section id="about-me" className="w-full max-w-prose mx-auto flex flex-col flex-wrap gap-4" >
                        {aboutMeBlocks.blockTwo.map((aboutMeText, index) => (
                            <AboutMe
                                key={index}
                                aboutMeText={aboutMeText}
                            />
                        ))}
                    </section>
                    <section id="recent-distractions" className="columns-1 space-y-24 my-8" >
                        <MyMovies />
                        <MySpotify />
                    </section>
                </div>
            </SampleCodeContextProvider>
        </Layout>
    )
}

export default Page;