import Image from "next/image";

type ThumbnailProps = {
    imageSrc: string;
    imageAlt: string;
    onClick: () => void;
    name: string;
    activeGame: "cinemoji" | "worcl" | undefined;
}

const Thumbnail = ({
    imageSrc,
    imageAlt,
    onClick,
    name,
    activeGame,
}: ThumbnailProps) => {
    return (
        <button
            onClick={onClick}
            className={`group relative ${activeGame === name.toLowerCase() ? 'bg-teal-600' : 'bg-stone-900'} p-1 rounded`}
        >
            <Image src={imageSrc} alt={imageAlt} width={100} height={100} />
            <span className="absolute w-32 -top-12 left-1/2 z-10 transform -translate-x-1/2 scale-0 rounded bg-white p-2 text-stone-900 text-center font-bold transition duration-200 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-100">
                {name}
            </span>
        </button>
    )
};

export default Thumbnail;