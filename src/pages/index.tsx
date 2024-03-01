import AboutMe from "@/components/aboutMe";
import TypewriterHero from "@/components/hero/typewriterHero";
import GamesContainer from "./games/components/container";
import { CinemjoiContextProvider } from "./games/cinemoji/context/cinemojiStateProvider";
import GameStateProvider from "./games/worcl/context/gameStateProvider";
import Tag from "@/components/tag";
import { FaCode, FaFileCode, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiExpress, SiMongodb, SiPostgresql } from "react-icons/si";
import Layout from "@/layout/main";
import MySpotify from "@/components/mySpotify";
import MyMovies from "@/components/myMovies";
import { SampleCodeContextProvider } from "@/components/sample/context/samplesStateProvider";
import Link from "next/link";
import pageData from "../data/index.json"

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

    const aboutMeTextOne = `I\'m a technological mercenary (full stack developer for hire), seeker of truth, and pursuer of true autonomy.`
    const aboutMeTextTwo = `My goal is to be good at what I do. How do I define that? Simple: I don't want to just bring high quality code to any project I work on but to do so elegantly and efficiently. I believe developers should prioritize the needs of the business over the needs of the project, meaning doing what it takes to increase conversions, user retention, and reduce the cost of development without sacrificing usability, security, or performance.`
    const aboutMeTextThree = `In my free time, I\'m just like any other dopamine addicted little lab rat: I spend time with my wife and kids, play video games, and watch movies. Here are some of the things I\'ve been into lately...`

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
                        {aboutMeBlocks.blockOne.map((aboutMeText, index) => (
                            <AboutMe 
                                key={index}
                                aboutMeText={aboutMeText}
                            />
                        ))}
                        <p className="flex flex-nowrap gap-2" >Click these to check out the actual code for what you're looking at <FaCode className="text-orange-400 my-auto" /></p>
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