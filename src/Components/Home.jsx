import { useContext, useState } from "react";
import Articles from "./Articles";
import { ThemeContext } from "../contexts/ThemeContext";

function Home() {

  const {isDark} = useContext(ThemeContext)
  const [topicInput, setTopicInput] = useState("")

  return (
    <div>
        <Articles setTopicInput={setTopicInput} />
    </div>
  )
}

export default Home;
