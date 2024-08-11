import { useState } from "react";
import Articles from "./Articles";

function Home({isDark}) {

  const [topicInput, setTopicInput] = useState("")

  return (
    <div>
        <Articles isDark={isDark} setTopicInput={setTopicInput} />
    </div>
  )
}

export default Home;
