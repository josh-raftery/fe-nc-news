import sortByArticles from "../Queries/sortByArticles"
import { useEffect, useState } from "react"

function SortBy({setSortByInput}){

    const [sortBy, setSortBy] = useState([])

    useEffect(() => {
        setSortBy(sortByArticles)
    },[])


    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button"  className="btn btn-secondary m-1">Sort By</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {sortBy.map((query) => {
                        return(
                            <li onClick={() => handleClick(query.sort)} className="category" key={query.sort}>{query.name}</li>
                        )
                    })}
                    <li onClick={() => handleClick("")}>
                        Clear
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SortBy