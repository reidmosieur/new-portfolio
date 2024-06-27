import { PiCaretDoubleLeft, PiCaretDoubleRight, PiCaretLeft, PiCaretRight } from "react-icons/pi";

import { useMyMoviesContext } from "../../context/myMoviesStateContext";
import Dropdown from "@/components/dropdown";

type Button = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({
    children,
    onClick,
    disabled,
}: Button) => {
    return (
        <button
            onClick={onClick}
            className={`w-fit h-fit hover:bg-stone-800`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

const Pagination = () => {
    const {
        ratedMovies,
        currentPagination,
        setCurrentPagination,
        fetching,
    } = useMyMoviesContext();

    const resultsPerPage = 20;
    const totalResults = ratedMovies?.total_results || 0;

    const startRange = (currentPagination.currentPage - 1) * resultsPerPage + 1;
    const endRange = Math.min(currentPagination.currentPage * resultsPerPage, totalResults);

    const leftRightArrowsClasses = `w-5 h-5 ${fetching && 'text-stone-500'}`;

    return (
        <div className="relative gap-4 flex flex-wrap gap-2" >
            <div className="w-fit flex flex-nowrap gap-4" >
                <Button
                    onClick={() => setCurrentPagination({
                        ...currentPagination,
                        currentPage: currentPagination.currentPage - 1,
                    })}
                    disabled={fetching || currentPagination.currentPage === 1}
                >
                    <PiCaretLeft className={`${leftRightArrowsClasses} ${currentPagination.currentPage === 1 && 'text-stone-500'}`} />
                </Button>
                <small>{startRange} - {endRange} of {totalResults}</small>
                <Button
                    onClick={() => setCurrentPagination({
                        ...currentPagination,
                        currentPage: currentPagination.currentPage + 1,
                    })}
                    disabled={fetching || ratedMovies?.total_pages === currentPagination.currentPage}
                >
                    <PiCaretRight className={`${leftRightArrowsClasses} ${ratedMovies?.total_pages === currentPagination.currentPage && 'text-stone-500'}`} />
                </Button>
            </div>
            <Dropdown
                value={currentPagination.currentSort}
                className="w-fit h-full text-sm bg-black"
                options={[
                    {
                        name: 'Review Date (Oldest First)',
                        value: 'created_at.asc',
                    },
                    {
                        name: 'Review Date (Newest First)',
                        value: 'created_at.desc',
                    },
                ]}
                onChange={(e) => {
                    setCurrentPagination({
                        ...currentPagination,
                         currentSort: e.target.value as 'created_at.asc' | 'created_at.desc',
                     });
                }}
                disabled={fetching}
            />
        </div>
    )
};

export default Pagination;