import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export default function Next(){
    const {isDark} = useContext(ThemeContext)

    return <svg version="1.0" xmlns="http://www.w3.org/2000/svg"   style={{width: "20px"}} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"> <path d="M1823 2485 c-51 -22 -82 -87 -68 -142 4 -19 123 -145 348 -370 l342 -343 -1090 0 c-630 0 -1107 -4 -1130 -10 -60 -14 -95 -58 -95 -120 0 -62 35 -106 95 -120 23 -6 500 -10 1130 -10 l1090 0 -344 -344 -344 -344 -5 -51 c-4 -49 -3 -52 37 -92 40 -40 43 -41 92 -37 l51 5 469 469 469 469 0 55 0 54 -457 459 c-252 252 -470 465 -485 473 -33 17 -64 17 -105 -1z"/> </g> </svg> 
}