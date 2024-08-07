import { useEffect, useState } from "react"
import orderArticles from "../Queries/orderArticles"

function Order({setOrderInput}){
    const [order, setOrder] = useState([])
    const [orderedName,setOrderedName] = useState("")
    const [isOrdered, setIsOrdered] = useState(false)

    useEffect(() => {
        setOrder(orderArticles)
    },[])

    function handleClick(orderInput){
        setOrderInput(orderInput.order)
        if(!orderInput){
            setIsOrdered(false)
        } else{
            setIsOrdered(true)
            setOrderedName(orderInput.name)
        }
    }

    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button"  className={isOrdered ? "btn btn-outline btn-success" : "btn btn-outline"}>{isOrdered ? orderedName : "Order"}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {order.map((query) => {
                       return(
                            <li onClick={() => handleClick(query)} className="category" key={query.order}>{query.name}</li>
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

export default Order