import sortByArticles from "../Queries/sortByArticles"
import { useEffect, useState } from "react"

function SortBy({setPage,setMaxPages,setPagination,setSortByInput, setIsSorted, isSorted}){

    const [sortBy, setSortBy] = useState([])
    const [sortByName,setSortByName] = useState("")

    useEffect(() => {
        setSortBy(sortByArticles)
    },[])

    function handleClick(sortInput){
        setPage(1)
        setPagination(false)
        setMaxPages(false)
        
        setSortByInput(sortInput.sort)
        if(!sortInput){
            setIsSorted(false)
        } else{
            setIsSorted(true)
            setSortByName(sortInput.name)
        }
    }



    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button"  className={isSorted ? "btn btn-outline btn-success" : "btn btn-outline"}>{isSorted ? sortByName : "Sort By"}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {sortBy.map((query) => {
                        return(
                            <li onClick={() => handleClick(query)} className="category" key={query.sort}>{query.name}</li>
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