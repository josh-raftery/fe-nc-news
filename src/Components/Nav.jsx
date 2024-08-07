import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User";
import { useContext } from "react";

function Nav(){
    const { user } = useContext(UserContext)
    const [userData] = user
    return (
        <div style={{marginBottom: "2rem"}} className="navbar bg-primary text-primary-content">
            <div className="flex-1">
            <Link to = "/">
                <div className="btn btn-ghost text-xl">NC News</div>
            </Link>
            </div>
            <Link to = "topics">
                <button className="btn btn-info">Topics</button>
            </Link>
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