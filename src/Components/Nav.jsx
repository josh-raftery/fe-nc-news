import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { useContext, useEffect, useState } from "react";
import DayNight from "./DayNight";

function Nav({ setIsDark, isDark }) {
  const { user } = useContext(UserContext);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const isDarkLocal = JSON.parse(localStorage.getItem("theme"));
    if (isDarkLocal !== null) {
      setIsDark(isDarkLocal);
    }
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "night" : "winter"
    );
  }, [isDark]);

  function switchTheme(){
    setIsDark((currTheme) => {
        const newTheme = !currTheme
        localStorage.setItem('theme', JSON.stringify(newTheme))
        return newTheme
    })
}

  return (
    <div style={{ marginBottom: "0.3rem" }} className="navbar">
      <div className="flex-1">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-ghost m-1">
            <img
              style={{ width: "30px" }}
              src={
                isDark ? "/assets/hamburger-night.png" : "/assets/hamburger.png"
              }
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <Link to="topics">
              <li>
                <a>
                  <img
                    style={{ width: "40px" }}
                    src={
                      isDark ? "/assets/topics-night.png" : "/assets/topics.png"
                    }
                  />{" "}
                  Browse Topics
                </a>
              </li>
            </Link>
            <Link to="/postArticle">
              <li>
                <a>
                  <img
                    style={{ width: "45px" }}
                    src={isDark ? "/assets/post-night.png" : "/assets/post.png"}
                  />{" "}
                  Post an Article
                </a>
              </li>
            </Link>
            <li onClick={switchTheme} >
                <a>
                    <DayNight isDark={isDark} setIsDark={setIsDark} />
                     Day/Night Mode
                </a>
            </li>
          </ul>
        </div>
        <Link to="/">
          <div className="btn btn-ghost text-xl">
            <img
              className="home-btn"
              src={isDark ? "/assets/home-night.png" : "/assets/home.png"}
            />
          </div>
        </Link>
      </div>
      <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {user ? 
        <>
            <li><a>Profile</a></li>
            <li><a>Sign Out</a></li>
        </>
         :
        <>
            <li><a>Sign In</a></li>
            <li><a>Sign Up</a></li>
        </>
        }
      </ul>
    </div>
  </div>
    </div>
  );
}

export default Nav;
