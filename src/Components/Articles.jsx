import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useContext, useEffect, useState } from "react";
import { getArticles, getUser } from "../api";
import { ErrorContext } from "../contexts/Error";
import Filters from "./Filters.jsx";
import Opaque from "./Opaque.jsx";
import Loading from "./Loading.jsx";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import Plus from "./Plus.jsx";

function Articles() {
  const { isDark } = useContext(ThemeContext);

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setlimit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [profilePictures, setProfilePictures] = useState([]);
  const [dates, setDates] = useState([]);
  const [checkbox, setCheckBox] = useState({
    topic: "",
    sort_by: "",
    order: "",
  });
  const [title, setTitle] = useState("");
  const [maxPages, setMaxPages] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newCheckbox = { ...checkbox };

    if (params.get("topic")) newCheckbox.topic = params.get("topic");
    if (params.get("sort_by")) newCheckbox.sort_by = params.get("sort_by");
    if (params.get("order")) newCheckbox.order = params.get("order");

    if (params.get("title")) {
      setSearch(params.get("title"));
    }

    setCheckBox(newCheckbox);

    if (params.get("clear")) {
      setSearch("");
      setPage(1);
      setPagination(false);
      setMaxPages(false);
    }

    if (params.get("reset")) {
      setSearch("");
      setCheckBox({
        topic: "",
        sort_by: "",
        order: "",
      });
      setTitle("");
      setTitleInput("");
      setPage(1);
      setPagination(false);
      setMaxPages(false);
    }
  }, [location.search]);

  useEffect(() => {
    const params = {};

    for (let key in checkbox) {
      let value = checkbox[key];
      if (value) {
        params[key] = value;
      }
    }

    if (search) {
      params.title = search;
    }

    if (page) params.p = page;
    if (limit) params.limit = limit;

    getArticles(params)
      .then((articles) => {
        setNoResults(false);
        setisLoading(false);
        setTotalCount(articles[0].total_count);
        if (!pagination) {
          setArticles(articles);
        } else {
          setArticles((currArticles) => {
            return [...currArticles, ...articles];
          });
        }
        const datesArr = articles.map((article) => {
          let date = article.created_at.split("T");
          return date[0];
        });
        setDates((currDates) => [...currDates, ...datesArr]);
        const userPromises = articles.map((article) => {
          return getUser(article.author);
        });
        return Promise.all(userPromises);
      })
      .then((users) => {
        if (profilePictures.length === 0) {
          setProfilePictures(users.map((user) => user.avatar_url));
        } else {
          setProfilePictures((currProfilePictures) => {
            const newProfilePictures = users.map((user) => user.avatar_url);
            return [...currProfilePictures, ...newProfilePictures];
          });
        }
      })
      .catch(() => {
        setisLoading(false);
        if (search) {
          setNoResults(true);
        } else {
          setError([{ code: 404, msg: "Not Found" }]);
          navigate("/error");
        }
      });
  }, [checkbox, page, limit, pagination, titleInput, search]);

  useEffect(() => {
    setisLoading(true);
    const params = new URLSearchParams();

    if (checkbox.topic) params.set("topic", checkbox.topic);
    if (checkbox.sort_by) params.set("sort_by", checkbox.sort_by);
    if (checkbox.order) params.set("order", checkbox.order);
    if (search) params.set("title", search);

    setTitle(() => {
      let titleArr = [];
      if (checkbox.topic) {
        titleArr.push(
          `${checkbox.topic[0].toUpperCase()}${checkbox.topic.slice(1)}`
        );
      }
      if (titleInput) {
        titleArr.push(titleInput);
      }
      return titleArr.join(" · ");
    });

    navigate({
      pathname: "/",
      search: params.toString(),
    });
  }, [checkbox, navigate, search]); // TO DO

  function newPage() {
    setPagination(true);
    if (page * limit < totalCount) {
      setPage((currPage) => {
        return currPage + 1;
      });
    }
  }

  useEffect(() => {
    if (totalCount) {
      if (page * limit > totalCount) {
        setMaxPages(true);
      }
    }
  }, [page, totalCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (noResults) {
    return <h2 style={{ marginTop: "10rem" }}>no results...</h2>;
  }

  return (
    <div
      className="articles-container"
      style={{ marginTop: "152px", paddingLeft: "2rem", paddingRight: "2rem" }}
    >
      {showFilters && (
        <>
          <Filters
            setTitle={setTitle}
            checkbox={checkbox}
            setCheckBox={setCheckBox}
            setShowFilters={setShowFilters}
            setTitleInput={setTitleInput}
            setPage={setPage}
            setPagination={setPagination}
            setMaxPages={setMaxPages}
          />
          <Opaque />
        </>
      )}
      <div className="filter-container bg-base-100  flex justify-between items-center pb-4">
        <h2 style={{ marginLeft: "7%" }} className="card-title">
          {title}
        </h2>
        <button
          onClick={() => setShowFilters(true)}
          className="filter-button btn btn-outline flex items-center"
        >
          Filter & Sort
           <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  style={{ width: "25px", marginLeft: "8px" }} viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"> <path d="M505 2533 c-89 -32 -159 -99 -184 -176 l-11 -32 -92 3 c-161 6 -218 -15 -218 -78 0 -63 57 -84 217 -78 l92 3 16 -41 c58 -153 255 -226 407 -151 64 31 112 81 140 144 l19 43 1007 0 c615 0 1020 4 1041 10 82 23 82 117 0 140 -21 6 -426 10 -1041 10 l-1007 0 -19 43 c-61 137 -228 210 -367 160z m161 -149 c73 -35 105 -133 66 -204 -23 -42 -84 -80 -130 -80 -79 0 -152 73 -152 152 0 105 119 178 216 132z"/> <path d="M2303 1782 c-86 -31 -144 -85 -178 -166 l-15 -36 -1008 0 c-615 0 -1020 -4 -1041 -10 -82 -23 -82 -117 0 -140 21 -6 426 -10 1041 -10 l1007 0 19 -43 c28 -63 76 -113 140 -144 47 -23 70 -28 132 -28 62 0 85 5 132 28 64 31 112 81 140 144 l19 43 107 0 c155 0 201 18 201 80 0 62 -46 80 -201 80 l-107 0 -19 43 c-61 138 -228 210 -369 159z m171 -155 c21 -12 47 -38 57 -57 38 -71 13 -157 -57 -197 -105 -60 -232 19 -221 138 10 113 123 173 221 116z"/> <path d="M1403 1032 c-86 -31 -144 -85 -178 -166 l-15 -36 -558 0 c-327 0 -571 -4 -591 -10 -82 -23 -82 -117 0 -140 20 -6 264 -10 591 -10 l557 0 19 -43 c11 -24 34 -59 51 -80 82 -92 237 -121 353 -64 64 31 112 81 140 144 l19 43 557 0 c327 0 571 4 591 10 82 23 82 117 0 140 -20 6 -264 10 -591 10 l-557 0 -19 43 c-61 138 -228 210 -369 159z m184 -160 c90 -64 78 -209 -21 -256 -104 -49 -223 31 -213 145 7 87 72 143 158 136 26 -2 60 -13 76 -25z"/> </g> </svg> 
        </button>
      </div>
      <div className="articles-div">
        <div className="flex gap-[50px] flex-wrap justify-center ">
          {articles.map((article, index) => {
            return (
              <Link key={article.article_id} to={`/${article.article_id}`}>
                <div key={article.article_id} className="article-preview-div">
                  <img
                    className=" h-[266.85px] w-[400px]"
                    src={article.article_img_url}
                    alt={article.title}
                  />
                  <div className="flex justify-between">
                    <div className="w-[60px] flex justify-center h-[100px]">
                      <img
                        className="articles-author-img mt-3"
                        src={profilePictures[index]}
                      />
                    </div>
                    <div className="w-[340px] relative h-[100px]">
                      <h2
                        style={{
                          fontSize: "18px",
                          height: "auto",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2, // Adjust the number of lines as needed
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                        }}
                        className="mt-3"
                      >
                        <b>{article.title}</b>
                      </h2>
                      <div className="flex justify-between left-0 right-0 absolute bottom-0">
                        <p style={{ fontSize: "80%" }}>{article.author}</p>
                        <p className="bottom-[3px] relative">
                          <b>·</b>
                        </p>
                        <p style={{ fontSize: "80%" }}>{dates[index]}</p>
                        <p className="bottom-[3px] relative">
                          <b>·</b>
                        </p>
                        {/* <div className="flex justify-between w-full"> */}
                        <p style={{ fontSize: "80%" }}> {article.topic}</p>
                        <p className="bottom-[3px] relative">
                          <b>·</b>
                        </p>
                        <div className="flex">
                          <p style={{ fontSize: "80%" }} className="">
                            {article.comment_count}
                          </p>
                           <svg version="1.0" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  width="20px" style={{marginLeft: "0.2rem"}} height="20px" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"> <path d="M380 2784 c-30 -8 -73 -26 -96 -39 -61 -36 -139 -126 -166 -193 l-23 -57 -3 -670 c-2 -474 0 -688 8 -730 31 -162 162 -290 320 -312 l55 -8 3 -278 c1 -152 5 -277 8 -277 3 0 184 125 402 277 l397 278 670 5 670 5 56 28 c72 35 151 114 186 186 l28 56 0 730 0 730 -32 66 c-40 81 -102 140 -191 182 l-67 32 -1085 2 c-933 2 -1093 0 -1140 -13z m2262 -191 c31 -22 54 -50 72 -85 l26 -52 0 -659 c0 -491 -3 -670 -12 -701 -18 -59 -91 -129 -150 -144 -34 -9 -231 -12 -693 -12 l-647 0 -295 -205 c-162 -113 -296 -205 -299 -205 -2 0 -4 92 -4 205 l0 205 -93 0 c-110 0 -170 17 -217 63 -73 71 -70 35 -70 785 0 542 3 679 13 705 21 48 62 93 110 116 l42 21 1085 -2 1085 -3 47 -32z"/> <path d="M844 2207 c-3 -8 -4 -45 -2 -83 l3 -69 653 -3 652 -2 0 85 0 85 -650 0 c-537 0 -652 -2 -656 -13z"/> <path d="M840 1780 l0 -80 655 0 655 0 0 80 0 80 -655 0 -655 0 0 -80z"/> <path d="M840 1430 l0 -80 655 0 655 0 0 80 0 80 -655 0 -655 0 0 -80z"/> </g> </svg> 
                          <p style={{ fontSize: "80%" }} className="ml-2">
                            {" "}
                            {article.votes}
                          </p>
                          {article.votes >= 0 ? <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"  width="18px" height="18px" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="currentColor" stroke="none"> <path d="M2823 5856 c-585 -714 -2027 -2536 -2036 -2571 -7 -26 2 -66 21 -95 l33 -50 619 0 620 0 0 -1451 c0 -1570 -3 -1526 109 -1629 l54 -50 757 0 757 0 54 50 c112 103 109 59 109 1629 l0 1451 620 0 619 0 33 50 c54 83 46 94 -1056 1470 -1239 1545 -1118 1435 -1313 1196z m-839 -2451 c-147 -3 -381 -3 -520 0 -140 3 -20 6 266 6 286 0 400 -3 254 -6z m2501 0 c-135 -3 -355 -3 -490 0 -135 4 -24 6 245 6 270 0 380 -2 245 -6z"/> </g> </svg>   :  <svg  version="1.0" xmlns="http://www.w3.org/2000/svg"  width="18px" height="18px" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="currentColor" stroke="none"> <path d="M2250 5981 c-55 -23 -123 -100 -149 -167 -14 -38 -21 -528 -21 -1505 l0 -1449 -620 0 -619 0 -33 -50 c-54 -83 -46 -94 1056 -1470 1045 -1304 1067 -1330 1136 -1330 69 0 91 26 1136 1330 1102 1376 1110 1387 1056 1470 l-33 50 -619 0 -620 0 0 1451 c0 1570 3 1526 -109 1629 l-54 50 -734 4 c-403 2 -751 -3 -773 -13z m1016 -256 c-156 -3 -417 -3 -580 0 -163 3 -35 6 284 6 319 0 452 -3 296 -6z"/> </g> </svg>}
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div style={{ marginBottom: "2rem" }} className="more-pages">
        {!maxPages && (
          <button
            style={{ marginTop: "2rem" }}
            onClick={newPage}
            className="btn btn-outline btn-circle"
          >
            <Plus/>
          </button>
        )}
      </div>
    </div>
  );
}

export default Articles;
