import { Link } from "react-router-dom";
import Next from "./Next";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function NoUserModal({setModal}){
    const {isDark} = useContext(ThemeContext)

    function closeModal(){
        setModal(false)
    }

    return (

        <section className="lex flex-col items-center pb-10 m-4">
            <div className="redirect-container bg-base-100 card w-96 shadow-xl">
                <svg
                    onClick={closeModal}
                    fill="currentColor"
                    viewBox="0 0 10 10"
                    width="1.2em"
                    height="1.2em"
                    stroke="currentColor"
                    stroke-width="2"
                    className="close-modal clear-search opacity-80"
                >
                    <line x1="1" y1="1" x2="9" y2="9" />
                    <line x1="9" y1="1" x2="1" y2="9" />
                </svg>
                <h2 className="card-title  mb-6">To use this feature you have to...</h2>
                <Link to='/signin' className="w-full">
                    <button onClick={closeModal} className="btn btn-block btn-outline mb-6">Sign In<Next/></button>
                </Link>
                <Link to='/signup' className="w-full">
                    <button onClick={closeModal} className="btn btn-block btn-outline  mb-6">Sign Up<img style={{width: "20px"}} src={isDark ? '/assets/profile-night.png' : '/assets/profile.png'} /></button>
                </Link>
                <h2 className="card-title mb-6">Or...</h2>
                <Link to='/' className="w-full">
                    <button onClick={closeModal} className="btn btn-block btn-outline"><img style={{width: "20px"}} src={isDark ? '/assets/previous-night.png' : '/assets/previous.png'} />Back to Home</button>
                </Link>
            </div>
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </section>
    )
}