import { useEffect, useState } from "react"
import orderArticles from "../Queries/orderArticles"

function Order({setOrderInput}){
    const [order, setOrder] = useState([])

    useEffect(() => {
        setOrder(orderArticles)
    },[])

    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button"  className="btn btn-secondary m-1">Order</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {order.map((query) => {
                       return(
                            <li onClick={() => handleClick(query.order)} className="category" key={query.order}>{query.name}</li>
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