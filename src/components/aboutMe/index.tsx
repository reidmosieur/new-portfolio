type AboutMeProps = {
    aboutMeText: string,
}

const AboutMe = ({
    aboutMeText,
}: AboutMeProps) => {
    return (
        <p className="sm:text-lg lg:text-xl" >{aboutMeText}</p>
    )
};

export default AboutMe;