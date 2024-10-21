import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { useContext, useEffect, useState } from "react";
import DayNight from "./DayNight";
import noUserModal from "./NoUserModal";
import { ThemeContext } from "../contexts/ThemeContext";
import NoUserModal from "./NoUserModal";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(UserContext);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [modal, setModal] = useState(false);

  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    if (search) {
      const currUrl = location.pathname;
      const params = new URLSearchParams(location.search);

      if (currUrl === "/") {
        params.set("title", search);
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
    setSearch("");
    navigate(`/?clear=true`);
  }

  function handleReset() {
    navigate("/?reset=true");
  }

  function handlePostClick() {
    if (user) {
      navigate("/postArticle");
    } else {
      setModal(true);
    }
  }

  return (
    <>
      {modal && <NoUserModal setModal={setModal} />}
      <div
        style={{ marginBottom: "0.3rem" }}
        className="navbar bg-base-100 flex justify-between"
      >
        <div className="left-side-nav">
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm h-10"
            >
              <img
                style={{ width: "20px" }}
                src={
                  isDark
                    ? "/assets/hamburger-night.png"
                    : "/assets/hamburger.png"
                }
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow"
            >
              <Link to="topics">
                <li>
                  <a>
                    <img
                      style={{ marginLeft: "0.4rem", width: "20px" }}
                      src={
                        isDark
                          ? "/assets/topics-night.png"
                          : "/assets/topics.png"
                      }
                    />{" "}
                    Browse Topics
                  </a>
                </li>
              </Link>
              <li onClick={handlePostClick}>
                <a>
                  <img
                    style={{ marginLeft: "0.2rem", width: "25px" }}
                    src={isDark ? "/assets/post-night.png" : "/assets/post.png"}
                  />{" "}
                  Post an Article
                </a>
              </li>
              <li onClick={switchTheme}>
                <a>
                  <DayNight />
                  Day/Night Mode
                </a>
              </li>
            </ul>
          </div>
          <div
            onClick={handleReset}
            className="home-button btn btn-ghost btn-sm h-10 text-xl"
          >
            <img
              className="home-btn"
              style={{ width: "30px" }}
              src={isDark ? "/assets/home-night.png" : "/assets/home.png"}
            />
          </div>
        </div>
        <div className="search-div flex items-center w-full">
          <div className="search-bar w-full">
            <label className="input input-bordered flex items-center h-10 w-full">
              <input
                type="text"
                className="w-full h-10"
                placeholder="Search"
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                value={search}
                style={{ minWidth: "0"}} // Ensures no min-width is set
              />
              <svg
                onClick={handleClear}
                fill="currentColor"
                viewBox="0 0 10 10"
                width="1em"
                height="1em"
                stroke="currentColor"
                strokeWidth="2"
                className="clear-search-nav clear-search opacity-70"
              >
                <line x1="1" y1="1" x2="9" y2="9" />
                <line x1="9" y1="1" x2="1" y2="9" />
              </svg>
              <button
                onClick={handleSubmit}
                className="search-button btn btn-active btn-sm h-9 w-9"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="search-svg opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm btn-ghost btn-circle avatar"
            >
              <img
                style={{ objectFit: "scale-down" }}
                alt="Tailwind CSS Navbar component"
                src={
                  user
                    ? user.avatar_url
                    : isDark
                    ? "/assets/profile-night.png"
                    : "/assets/profile.png"
                }
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
    </>
  );
}

export default Nav;
