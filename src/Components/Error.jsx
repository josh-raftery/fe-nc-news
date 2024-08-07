import { useContext } from "react"
import { ErrorContext } from "../contexts/Error"

function Error(){

    const { error } = useContext(ErrorContext)
    const [errorData] = error

    return (
        <div className="error">
            <h1 style={{fontSize: "100px"}} >{errorData.msg + " " + errorData.code}</h1>
        </div>
    )
}

export default Error