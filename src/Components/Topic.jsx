import { Navigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Articles from "./Articles"
import Loading from "./Loading"
import { ErrorContext } from "../contexts/Error"
import { ThemeContext } from "../contexts/ThemeContext"

function Topic(){
    const [topicInput, setTopicInput] = useState("")
    const {topic} = useParams()
    const { setError } = useContext(ErrorContext)
    const {isDark} = useContext(ThemeContext)

    if(Number(topic)){
        setError([{
            msg: "Bad Request",
            code: 400
          }])
        return (
            <Navigate to="/error" replace/>
        )
      }

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