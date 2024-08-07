import { useState } from "react";
import Articles from "./Articles";

function Home() {

  const [topicInput, setTopicInput] = useState("")

  return (
    <div>
        <Articles setTopicInput={setTopicInput} />
    </div>
  )
}

export default Home;
