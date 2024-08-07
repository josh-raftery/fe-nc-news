import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Articles from "./Articles"
import Loading from "./Loading"

function Topic(){
    const [topicInput, setTopicInput] = useState("")
    const {topic} = useParams()
    console.log(topic)

    useEffect(() => {
        setTopicInput(topic)
    },[topic])

    if(!topicInput){
        return (
            <Loading/>
        )
    }

    return (
        <Articles topicInput={topicInput}/>
    )
}

export default Topic