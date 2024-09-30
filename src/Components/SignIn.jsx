import { useContext, useState } from "react";
import Next from "./Next";
import { UserContext } from "../contexts/User";
import { getUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {

    const navigate = useNavigate();

    const [usernameInput,setUsernameInput] = useState("")
    const {setUser} = useContext(UserContext)
    const [failure,setFailure] = useState(false)

    function handleChange(e){
        setUsernameInput(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(usernameInput)
        getUser(usernameInput)
        .then((user) => {
            setUser(user)
            setFailure(false)
            navigate('/')
        })
        .catch(() => {
            setFailure(true)
        })

    }

    return (
        <div className="flex flex-col items-center pb-10 m-4">
        <form onSubmit={handleSubmit} className="card bg-primary-200 shadow-xl pt-10 pl-10 pr-10">
            <h2 className="card-title mb-4">Sign In</h2>
            {failure && <p className="text-red-500 text-sm mb-1">Username not found</p>}
            <label htmlFor="username" className={`input input-bordered flex items-center gap-2 bg-primary-200 ${failure && 'input-error'}`}>
                <input
                    type="text"
                    className="grow"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={usernameInput}
                    required
                />
            </label>
            <div className="card-actions justify-end m-4">
            <Link to='/signup' >
                <button style={{marginRight: "2rem"}} className="btn btn-ghost">Create Account</button>
            </Link>
            <button type="submit" className="btn btn-outline">
                Sign In <Next />
            </button>
            </div>
        </form>
        </div>
    );
}
