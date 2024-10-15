import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { useContext, useEffect, useState } from "react";
import DayNight from "./DayNight";
import { ThemeContext } from "../contexts/ThemeContext";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(UserContext);
  const { isDark, setIsDark } = useContext(ThemeContext);

  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    if (search) {
      const currUrl = location.pathname;

      // Get current search parameters
      const params = new URLSearchParams(location.search);

      if (currUrl === "/") {
        // Set the 'title' parameter if on the home page
        params.set("title", search);
        // Update the URL with the new query parameters
        navigate(`/?${params.toString()}`);
      } else {
        navigate(`/?title=${search}`);
      }
    }
  }

  function switchTheme() {
    setIsDark((currTheme) => {
      const newTheme = !currTheme;
      localStorage.setItem("theme", JSON.stringify(newTheme));
      return newTheme;
    });
  }

  function handleSignOut() {
    setUser(null);
  }

  function handleClear() {
    const params = new URLSearchParams();
    setSearch("")
    params.delete("title")
    navigate(`/`);
  }

  return (
    <div
      style={{ marginBottom: "0.3rem" }}
      className="navbar bg-base-100 flex items-center justify-between p-4"
    >
      <div className="left-side-nav">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-ghost m-1">
            <img
              style={{ width: "20px" }}
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
                    style={{ marginLeft: "0.4rem", width: "20px" }}
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
                    style={{ marginLeft: "0.2rem", width: "25px" }}
                    src={isDark ? "/assets/post-night.png" : "/assets/post.png"}
                  />{" "}
                  Post an Article
                </a>
              </li>
            </Link>
            <li onClick={switchTheme}>
              <a>
                <DayNight />
                Day/Night Mode
              </a>
            </li>
          </ul>
        </div>
        <Link to="/">
          <div className="btn btn-ghost text-xl">
            <img
              className="home-btn"
              style={{ width: "40px" }}
              src={isDark ? "/assets/home-night.png" : "/assets/home.png"}
            />
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="search-bar gap-0.5">
          <label className="input input-bordered flex items-center h-10">
            <input
              type="text"
              className="w-full h-10 sm:w-64 md:w-96 lg:max-w-xl"
              placeholder="Search"
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              value={search}
            />
            <svg
              onClick={handleClear}
              fill="currentColor"
              viewBox="0 0 10 10"
              width="0.75em"
              height="0.75em"
              stroke="currentColor"
              stroke-width="2"
              className="clear-search opacity-70"
            >
              <line x1="1" y1="1" x2="9" y2="9" />
              <line x1="9" y1="1" x2="1" y2="9" />
            </svg>
          </label>
          <button onClick={handleSubmit} className="btn btn-active btn-sm h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <img
              style={{ width: "25px", height: "30px" }}
              alt="Tailwind CSS Navbar component"
              src={user ? user.avatar_url : "/assets/profile.png"}
            />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user ? (
              <>
                <li className="pointer-events-none">
                  <a className="hover:bg-transparent">
                    <img
                      alt="profile picture"
                      src={user.avatar_url}
                      style={{ width: "40px" }}
                    />
                    {user.username}
                  </a>
                </li>
                <li></li>
                <li onClick={handleSignOut}>
                  <a>
                    <img
                      style={{ marginLeft: "0.3rem", height: "15px" }}
                      src={
                        !isDark
                          ? "/assets/signout.png"
                          : "/assets/signout-night.png"
                      }
                    />
                    Sign Out
                  </a>
                </li>
                <Link to="/signin">
                  <li>
                    <a>
                      <img
                        style={{ width: "20px" }}
                        src={
                          !isDark
                            ? "/assets/switchaccount.png"
                            : "/assets/switchaccount-night.png"
                        }
                      />
                      Switch Accounts
                    </a>
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <li>
                    <a>
                      <img
                        style={{ width: "20px" }}
                        src={
                          !isDark
                            ? "/assets/signin.png"
                            : "/assets/signin-night.png"
                        }
                      />
                      Sign In
                    </a>
                  </li>
                </Link>
                <Link to="/signUp">
                  <li>
                    <a>
                      <img
                        style={{ width: "20px" }}
                        src={
                          !isDark
                            ? "/assets/signup.png"
                            : "/assets/signup-night.png"
                        }
                      />
                      Sign Up
                    </a>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
