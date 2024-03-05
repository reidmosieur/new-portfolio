type AboutMeProps = {
    aboutMeText: string,
    extraClasses?: string,
}

const AboutMe = ({
    aboutMeText,
    extraClasses,
}: AboutMeProps) => {
    return (
        <p className={`sm:text-lg lg:text-xl ${extraClasses}`} >{aboutMeText}</p>
    )
};

export default AboutMe;