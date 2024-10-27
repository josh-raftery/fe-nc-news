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
                    <button onClick={closeModal} className="btn btn-block btn-outline  mb-6">Sign Up<svg version="1.0" xmlns="http://www.w3.org/2000/svg"  style={{width: "20px"}}  viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"> <path d="M1325 2985 c-203 -44 -400 -199 -495 -390 -95 -192 -95 -447 1 -636 98 -196 272 -335 481 -384 92 -22 258 -19 352 5 187 47 354 180 454 360 107 192 109 446 5 660 -39 81 -59 108 -137 185 -72 72 -109 99 -176 133 -47 24 -110 50 -140 58 -83 22 -261 27 -345 9z m300 -180 c166 -44 324 -196 375 -364 24 -75 28 -215 10 -296 -32 -144 -153 -292 -292 -359 -214 -103 -454 -61 -624 108 -221 220 -216 562 10 779 105 101 219 146 366 147 55 0 121 -7 155 -15z"/> <path d="M752 1530 c-103 -27 -167 -64 -242 -140 -162 -164 -245 -415 -257 -770 -6 -202 2 -256 53 -359 61 -122 187 -216 333 -247 100 -21 1615 -20 1716 1 205 43 351 194 386 398 8 48 9 117 5 205 -19 386 -125 671 -304 815 -93 75 -278 131 -373 113 -20 -3 -83 -36 -140 -73 -158 -101 -307 -153 -436 -153 -113 1 -248 45 -374 122 -168 102 -180 108 -239 107 -30 0 -88 -9 -128 -19z m247 -222 c185 -120 332 -163 531 -155 181 6 306 49 487 168 75 49 80 51 135 46 255 -22 413 -325 413 -793 0 -170 0 -171 -30 -229 -21 -40 -46 -71 -79 -96 -96 -72 -56 -70 -976 -67 l-825 3 -50 23 c-142 65 -193 179 -181 401 24 421 141 672 347 745 86 30 122 23 228 -46z"/> </g> </svg></button>
                     
                </Link>
                <h2 className="card-title mb-6">Or...</h2>
                <Link to='/' className="w-full">
                    <button onClick={closeModal} className="btn btn-block btn-outline"><svg version="1.0" xmlns="http://www.w3.org/2000/svg" style={{width: "20px"}} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"> <path d="M1075 2490 c-11 -4 -228 -217 -482 -472 l-463 -464 0 -54 0 -54 462 -463 c254 -254 474 -467 490 -474 35 -14 88 -5 122 22 31 24 51 86 42 126 -5 19 -117 138 -349 370 l-342 343 1090 0 c630 0 1107 4 1130 10 60 14 95 58 95 120 0 62 -35 106 -95 120 -23 6 -500 10 -1130 10 l-1090 0 344 344 344 344 5 51 c4 49 3 53 -36 91 -33 33 -46 40 -78 39 -22 0 -48 -4 -59 -9z"/> </g> </svg> Back to Home</button>
                    
                </Link>
            </div>
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </section>
    )
}