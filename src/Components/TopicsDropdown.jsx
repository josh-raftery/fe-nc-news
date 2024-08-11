import { useEffect, useState } from "react"
import { getTopics } from "../api"


function TopicsDropDown({setPage,setMaxPages,setPagination,missingTopic,topicsDropDown,setTopicsDropDown,isTopicDropDown,setIsTopicDropDown}){
    const [topics, setTopics] = useState([])
    
    
    useEffect(() => {
        getTopics()
        .then((topics) => {
            setTopics(topics)
        })
    },[])

    function handleClick(topic){
        setPage(1)
        setPagination(false)
        setMaxPages(false)

        setTopicsDropDown(topic)
        if(!topic){
            setIsTopicDropDown(false)
        } else{
            setIsTopicDropDown(true)
        }
    }

    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button"  className={isTopicDropDown ? "btn btn-outline btn-success" : missingTopic ? "btn btn-outline btn-error" : "btn btn-outline"}>{isTopicDropDown ? topicsDropDown : missingTopic ? "Select Topic!" : "Topics"}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {topics.map((topic) => {
                        return(
                            <li onClick={() => handleClick(topic.slug)} key={topic.slug}>{topic.slug}</li>
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

export default TopicsDropDown