import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User";
import { useContext, useEffect, useState } from "react";

function Nav({setIsDark,isDark}){
    const { user } = useContext(UserContext)
    const [userData] = user

    function switchTheme(){
        setIsDark((currTheme) => {
            const newTheme = !currTheme
            localStorage.setItem('theme', JSON.stringify(newTheme))
            return newTheme
        })
    }

    useEffect(() => {
        const isDarkLocal = JSON.parse(localStorage.getItem('theme'))
        if(isDarkLocal !== null){
          setIsDark(isDarkLocal)
        }
        document.documentElement.setAttribute('data-theme',isDark ? "dark" : "cupcake")
      },[isDark])

    return (
        <div style={{marginBottom: "2rem"}} className="navbar bg-primary text-primary-content">
            <div className="flex-1">
            <Link to = "/">
                <div className="btn btn-ghost text-xl"><img className="home-btn" src={'../../design/home.png'} ></img></div>
            </Link>
            <Link to = "topics">
                <button style={{fontSize: "20px"}} className="btn btn-ghost"><img className="topics-button" src="../../design/topics.png"/></button>
            </Link>
            <Link to = "/postArticle">
                <button style={{fontSize: "20px"}} className="btn btn-ghost"><img className="post-article-button" src="../../design/post.png"/></button>
            </Link>
            </div>
            <button style={{marginRight: "1rem"}} onClick = {switchTheme} ><img className="day-night" src={isDark ? "../../design/day.png" : "../../design/night.png"} ></img></button>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={userData.avatar_url} />
                    </div>
                </div>
                <ul
                    tabIndex="0"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li key="profile">
                        <a className="justify-between">Profile</a>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Nav