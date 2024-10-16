import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

function Delete(){
    const {isDark} = useContext(ThemeContext)

    return <img style={{width: "30px"}} src={isDark ? "/assets/delete-night.png" : "/assets/delete.png"} ></img>
}

export default Delete