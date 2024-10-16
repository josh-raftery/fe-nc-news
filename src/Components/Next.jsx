import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export default function Next(){
    const {isDark} = useContext(ThemeContext)

    return <img style={{width: "20px"}} src={isDark ? '/assets/next-night.png' : '/assets/next.png'}/>
}