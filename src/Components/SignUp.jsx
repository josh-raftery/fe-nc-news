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
  const [empty, setEmpty] = useState(false)

  function handleChange(e) {
    setFormData((currFormData) => {
      const newFormData = {...currFormData}
      newFormData[e.target.name] = e.target.value;
      return newFormData
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    for(let key in formData){
      if(!formData[key]){
        setEmpty(true)
      } else {
        setEmpty(false)
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
    }
    
  }

  return (
    <div className="flex flex-col items-center pb-10 m-4">
      <form
        onSubmit={handleSubmit}
        className="card bg-primary-200 shadow-xl pt-10 pl-10 pr-10"
      >
        <h2 className="card-title mb-4">Sign Up</h2>
        {failure && (
          <p className="text-red-500 text-sm mb-1">Bad connection, try again later</p>
        )}
        {empty && (
          <p className="text-red-500 text-sm mb-1">All fields are required</p>
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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-4">
           <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  style={{ width: "15px" }} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"> <path d="M667 2790 c-57 -45 -57 -45 177 -562 200 -442 215 -479 205 -507 l-11 -31 -297 0 c-331 0 -367 -5 -442 -63 -23 -17 -56 -57 -73 -87 l-31 -55 -3 -529 c-3 -595 -4 -587 70 -671 22 -25 59 -56 82 -68 l41 -22 1115 0 1115 0 41 22 c23 12 60 43 82 68 74 84 73 76 70 671 l-3 529 -31 55 c-17 30 -50 70 -73 87 -75 58 -111 63 -442 63 l-297 0 -11 31 c-10 30 3 61 195 488 114 251 211 469 216 484 7 19 6 37 -2 58 -24 58 -32 59 -296 59 -225 0 -243 -1 -267 -20 -17 -13 -68 -116 -158 -315 -73 -162 -136 -295 -140 -295 -3 0 -66 133 -139 296 -88 195 -142 302 -158 315 -23 18 -43 19 -267 19 -229 0 -244 -1 -268 -20z m539 -430 c64 -140 122 -270 130 -288 l13 -33 -37 -16 c-20 -8 -59 -30 -85 -49 l-48 -35 -14 33 c-7 18 -76 172 -153 341 l-140 308 109 -3 109 -3 116 -255z m914 254 c0 -4 -59 -138 -132 -298 -72 -160 -139 -310 -150 -333 l-19 -42 -47 33 c-26 19 -64 41 -86 50 -23 10 -36 21 -33 28 3 7 53 119 112 248 59 129 116 254 126 278 l18 42 106 0 c58 0 105 -3 105 -6z m-529 -756 c56 -19 107 -58 139 -106 16 -25 30 -49 30 -54 0 -4 -117 -8 -260 -8 -143 0 -260 4 -260 8 0 5 14 29 31 55 30 46 76 82 134 104 40 15 143 16 186 1z m1000 -387 l29 -29 0 -507 0 -506 -25 -24 -24 -25 -1071 0 -1071 0 -24 25 -25 24 0 506 0 507 29 29 29 29 1062 0 1062 0 29 -29z"/> <path d="M775 1299 c-56 -13 -126 -64 -163 -118 -43 -63 -55 -130 -50 -280 4 -148 21 -193 94 -261 75 -69 97 -75 279 -75 155 0 162 1 217 28 61 30 95 64 131 131 20 38 22 55 22 211 l0 170 -31 55 c-37 66 -97 114 -166 135 -58 17 -265 19 -333 4z m316 -208 c29 -29 29 -29 29 -156 0 -127 0 -127 -29 -156 -29 -29 -29 -29 -156 -29 -127 0 -127 0 -156 29 -29 29 -29 29 -29 156 0 127 0 127 29 156 29 29 29 29 156 29 127 0 127 0 156 -29z"/> <path d="M1529 1281 c-39 -39 -39 -80 0 -123 l29 -33 410 0 410 0 26 24 c14 13 28 36 31 52 7 32 -16 83 -44 99 -13 6 -166 10 -426 10 l-407 0 -29 -29z"/> <path d="M1529 721 c-32 -33 -37 -67 -14 -110 26 -50 39 -52 467 -49 l396 3 25 23 c32 30 41 67 26 104 -24 57 -30 58 -469 58 l-402 0 -29 -29z"/> </g> </svg> 
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className="grow"
            placeholder="name *"
            value={formData.name}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-4">
           <svg version="1.0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="15px" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"> <path d="M1030 2841 c-37 -12 -90 -40 -128 -69 -47 -36 -84 -94 -121 -192 -54 -140 -70 -150 -248 -150 -76 0 -149 -6 -179 -14 -167 -44 -295 -174 -339 -343 -22 -85 -22 -1481 0 -1566 42 -163 161 -290 316 -338 58 -18 109 -19 1169 -19 1060 0 1111 1 1169 19 155 48 274 175 316 338 28 109 13 178 -45 208 -82 42 -161 -5 -175 -105 -14 -102 -51 -161 -130 -203 l-40 -22 -1095 0 -1095 0 -41 22 c-51 27 -98 80 -115 130 -11 31 -14 178 -14 758 l0 721 26 49 c32 62 93 110 159 124 28 6 102 11 164 11 130 0 192 15 261 63 63 43 97 93 148 216 61 151 24 141 504 141 215 0 402 -4 415 -9 42 -17 66 -49 92 -129 45 -133 94 -195 200 -249 47 -25 64 -27 216 -33 176 -7 209 -15 267 -64 17 -14 42 -48 55 -74 23 -47 23 -50 26 -467 2 -270 6 -430 13 -447 33 -82 164 -80 206 3 20 38 18 845 -2 922 -44 169 -172 299 -339 343 -30 8 -103 14 -179 14 -188 0 -197 6 -253 162 -43 119 -89 173 -194 229 l-45 24 -460 2 c-253 1 -471 -2 -485 -6z"/> <path d="M1360 2064 c-152 -33 -287 -110 -392 -223 -192 -208 -244 -509 -135 -780 82 -203 285 -373 509 -426 92 -22 248 -19 343 5 257 66 454 258 527 517 26 92 30 265 9 352 -98 389 -482 637 -861 555z m269 -235 c115 -26 260 -139 314 -244 54 -108 72 -243 46 -355 -43 -189 -216 -345 -413 -373 -297 -43 -566 191 -566 493 0 135 47 247 147 348 123 125 291 172 472 131z"/> </g> </svg> 
          <input
            name="avatar_url"
            onChange={handleChange}
            type="text"
            className="grow"
            placeholder="profile picture URL *"
            value={formData.avatar_url}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
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
