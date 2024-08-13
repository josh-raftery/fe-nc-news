function Edit({isDark}){
    return <img style={{width: "30px"}} src={isDark ? "./assets/edit-night.png" : "./assets/edit.png"} ></img>
}

export default Edit