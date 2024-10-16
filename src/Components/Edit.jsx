import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

function Edit(){
    const {isDark} = useContext(ThemeContext)

    return <img style={{width: "30px"}} src={isDark ? "/assets/edit-night.png" : "/assets/edit.png"} ></img>
}

export default Edit