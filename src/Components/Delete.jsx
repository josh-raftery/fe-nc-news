function Delete({isDark}){
    return <img style={{width: "30px"}} src={isDark ? "/assets/delete-night.png" : "/assets/delete.png"} ></img>
}

export default Delete