import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { getUser } from "../api";
import Plus from "./Plus";

function PreviewArticles({ articles, title, windowSize, setPage, end, narrow }) {
  const { isDark } = useContext(ThemeContext);
  const [parsedDates, setParsedDates] = useState([])

  useEffect(() => {
    setParsedDates(articles.map((article) => {
      const date = article.created_at.split("T");
      return (date[0]);
  }))
  },[])

  return (
    <div className={`pt-2 ${narrow && 'article-sidebar-narrow'} pr-4 pb-2 gap-2  w-[100%]`}>
      <h2 className="mb-2" style={{ fontSize: "30px" }}>
        <b>{title}</b>
      </h2>
      {articles.map((article, index) => {
        return (
          <Link
            key={`${article.article_id}${title}`}
            to={`/${article.article_id}`}
          >
            <div className={`flex ${!narrow && 'article-sidebar'} gap-2`}>
              <img
                className="preview-article-img mb-4"
                src={article.article_img_url}
              ></img>

              <div className="relative w-full" >
                <h2
                  style={{
                    fontSize: "15px",
                    height: "42px",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                  }}
                  className="mb-1"
                >
                  {article.title}
                </h2>
                <div className="flex justify-between flex-wrap left-0 right-0 bottom-0 absolute mb-5">
                  <div className="flex gap-1">
                    <p
                      style={{
                        fontSize: "60%",
                        marginTop: "0.2rem",
                        marginRight: "0.2rem",
                      }}
                    >
                      <b>{article.author}</b>
                    </p>
                  </div>
                  {windowSize > 1600 && <p style={{fontSize: "70%", marginTop: "0.15rem"}} ><em>{parsedDates[index]}</em></p>}
                  <div className="flex">
                    <p style={{ fontSize: "80%" }} className="flex">
                      {article.comment_count}
                       <svg version="1.0" xmlns="http://www.w3.org/2000/svg" style={{
                          marginRight: "0.5rem",
                          marginLeft: "0.3rem",
                          marginTop: "0.2rem",
                          width: "18px",
                          height: "18px",
                        }} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"> <path d="M380 2784 c-30 -8 -73 -26 -96 -39 -61 -36 -139 -126 -166 -193 l-23 -57 -3 -670 c-2 -474 0 -688 8 -730 31 -162 162 -290 320 -312 l55 -8 3 -278 c1 -152 5 -277 8 -277 3 0 184 125 402 277 l397 278 670 5 670 5 56 28 c72 35 151 114 186 186 l28 56 0 730 0 730 -32 66 c-40 81 -102 140 -191 182 l-67 32 -1085 2 c-933 2 -1093 0 -1140 -13z m2262 -191 c31 -22 54 -50 72 -85 l26 -52 0 -659 c0 -491 -3 -670 -12 -701 -18 -59 -91 -129 -150 -144 -34 -9 -231 -12 -693 -12 l-647 0 -295 -205 c-162 -113 -296 -205 -299 -205 -2 0 -4 92 -4 205 l0 205 -93 0 c-110 0 -170 17 -217 63 -73 71 -70 35 -70 785 0 542 3 679 13 705 21 48 62 93 110 116 l42 21 1085 -2 1085 -3 47 -32z"/> <path d="M844 2207 c-3 -8 -4 -45 -2 -83 l3 -69 653 -3 652 -2 0 85 0 85 -650 0 c-537 0 -652 -2 -656 -13z"/> <path d="M840 1780 l0 -80 655 0 655 0 0 80 0 80 -655 0 -655 0 0 -80z"/> <path d="M840 1430 l0 -80 655 0 655 0 0 80 0 80 -655 0 -655 0 0 -80z"/> </g> </svg> 
                    </p>
                    <p style={{ fontSize: "80%" }} className="flex">
                      {article.votes}
                      {article.votes >= 0 ? <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"  style={{
                          width: "18px",
                          height: "18px",
                          marginTop: "0.1rem"
                        }} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="currentColor" stroke="none"> <path d="M2823 5856 c-585 -714 -2027 -2536 -2036 -2571 -7 -26 2 -66 21 -95 l33 -50 619 0 620 0 0 -1451 c0 -1570 -3 -1526 109 -1629 l54 -50 757 0 757 0 54 50 c112 103 109 59 109 1629 l0 1451 620 0 619 0 33 50 c54 83 46 94 -1056 1470 -1239 1545 -1118 1435 -1313 1196z m-839 -2451 c-147 -3 -381 -3 -520 0 -140 3 -20 6 266 6 286 0 400 -3 254 -6z m2501 0 c-135 -3 -355 -3 -490 0 -135 4 -24 6 245 6 270 0 380 -2 245 -6z"/> </g> </svg>   :  <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"  style={{
                          width: "18px",
                          height: "18px",
                          marginTop: "0.1rem"
                        }} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="currentColor" stroke="none"> <path d="M2250 5981 c-55 -23 -123 -100 -149 -167 -14 -38 -21 -528 -21 -1505 l0 -1449 -620 0 -619 0 -33 -50 c-54 -83 -46 -94 1056 -1470 1045 -1304 1067 -1330 1136 -1330 69 0 91 26 1136 1330 1102 1376 1110 1387 1056 1470 l-33 50 -619 0 -620 0 0 1451 c0 1570 3 1526 -109 1629 l-54 50 -734 4 c-403 2 -751 -3 -773 -13z m1016 -256 c-156 -3 -417 -3 -580 0 -163 3 -35 6 284 6 319 0 452 -3 296 -6z"/> </g> </svg>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}

      {!end &&
        <div className="justify-center flex h-[70px] w-full" >
        <button onClick={() => setPage((currPage) => currPage + 1)} className="btn btn-outline btn-circle" >
          <Plus/>
        </button>
       </div>}
    </div>
  );
}

export default PreviewArticles;
