import { useEffect, useState } from "react"
import { getTopics } from "../api"
import { Link } from "react-router-dom"

function Topics(){

    const [topics, setTopics] = useState([])
    
    useEffect(() => {
        getTopics()
        .then((topics) => {
            setTopics(topics)
        })
    },[])

    return (
        <div className="topics ">
             <div className="grid gap-[50px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10">
                {topics.map((topic) => {
                    return (
                        <Link key={topic.slug} to = {`/?topic=${topic.slug}`}>
                            <div className="card bg-base-100 w-96 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{topic.slug}</h2>
                                    <p>{topic.description}</p>
                                </div>
                            {/* <figure>
                                <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                            </figure>    later I will add an image column to the topics table and patch the topics    */   } 
                            </div>
                        </Link>
                    )
                })}
             </div>
        </div>
    )
}

export default Topics