import Opaque from "./Opaque"

function Loading(){
    return (
        <>
            <div className="loading-container">
                <span className="loading loading-ring loading-lg"></span>
            </div>
            <Opaque/>
        </>
    )
}

export default Loading