import { useContext, useState } from "react";
import Next from "./Next";
import { UserContext } from "../contexts/User";
import { getUser, postUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    avatar_url: "",
  });
  const { setUser } = useContext(UserContext);
  const [failure, setFailure] = useState(false);

  function handleChange(e) {
    setFormData((currFormData) => {
      const newFormData = {...currFormData}
      newFormData[e.target.name] = e.target.value;
      return newFormData
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    postUser(formData)
      .then((user) => {
        setUser(user);
        setFailure(false);
        navigate("/");
      })
      .catch(() => {
        setFailure(true);
      });
  }

  return (
    <div className="flex flex-col items-center pb-10 m-4">
      <form
        onSubmit={handleSubmit}
        className="card bg-primary-200 shadow-xl pt-10 pl-10 pr-10"
      >
        <h2 className="card-title mb-4">Sign Up</h2>
        {failure && (
          <p className="text-red-500 text-sm mb-1">Username not found</p>
        )}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            name="username"
            onChange={handleChange}
            type="text"
            className="grow"
            placeholder="username *"
            value={formData.username}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-4">
          <img
            fill="currentColor"
            style={{ width: "15px" }}
            src="/assets/nametag.png"
          ></img>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className="grow"
            placeholder="name *"
            value={formData.name}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-4">
          <img
            fill="currentColor"
            style={{ width: "15px" }}
            src="/assets/camera.png"
          ></img>
          <input
            name="avatar_url"
            onChange={handleChange}
            type="text"
            className="grow"
            placeholder="profile picture URL *"
            value={formData.avatar_url}
          />
        </label>
        <div className="card-actions flex justify-between mt-4 mb-4">
          <Link to="/signin">
            <button className="btn btn-ghost">Have an account?</button>
          </Link>
          <button type="submit" className="btn btn-outline">
            Sign Up <Next />
          </button>
        </div>
      </form>
    </div>
  );
}
