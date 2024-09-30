import { useState } from "react";
import Divider from "./Divider";
import Next from "./Next";

export default function Filters({checkbox, setCheckBox, setShowFilters, setTitle, setTitleInput}) {

const [checkboxInput, setCheckBoxInput] = useState(checkbox)

function clearAll(){
  setCheckBoxInput({
    topic: "",
    sort_by: "",
    order: ""
  })
  setCheckBox({
    topic: "",
    sort_by: "",
    order: ""
  })
  setTitle("")
  setTitleInput("")
}

  function handleClose() {
    setShowFilters(false)
  }

  function handleChange(input){
    console.log(input ,'input beginning')
    setCheckBoxInput((currInput) => {
      let output = {...currInput}
      for(let key in input){
        let value = input[key]
        if(output[key] === value){
          output[key] = ''
        } else {    const topicString = checkbox.topic
          console.log(topicString, ' topic')
            
          output[key] = value
        }
      }
      console.log(output)
      return output
    })
  }

  function handleSubmit(){
    let empty = true
    for(let key in checkboxInput){
      if(checkboxInput[key]){
        empty = false
      }
    }
    if(empty){
      setTitle("")
      setTitleInput("")
    }
    setCheckBox(checkboxInput)
  }

  return (
    <div className="filter-sidebar-wrapper">
      <div className="filter-sidebar bg-base-100 h-full flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="card-title">Filter & Sort</h2>
          <div className="flex space-x-2">
            <button onClick={clearAll} className="btn btn-ghost">Clear All</button>
            <button className="btn btn-ghost" onClick={handleClose}>
              <img style={{ width: "20px" }} src="/assets/close.png" />
            </button>
          </div>
        </div>

        <Divider />

        <div className="form-control flex-grow">
          <h2 className="card-title">Topic</h2>
          <label className="label cursor-pointer">
            <span className="label-text">Coding</span>
            <input checked={checkboxInput.topic === 'coding'} onChange={() => handleChange({topic: "coding"})} type="checkbox" className="checkbox checkbox-md" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Football</span>
            <input checked={checkboxInput.topic === 'football'} onChange={() => handleChange({topic: "football"})} type="checkbox"  className="checkbox checkbox-md" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Cooking</span>
            <input checked={checkboxInput.topic === 'cooking'} onChange={() => handleChange({topic: "cooking"})} type="checkbox" className="checkbox checkbox-md" />
          </label>

          <Divider />

          <h2 className="card-title">Sort By</h2>
          <label className="label cursor-pointer">
            <span className="label-text">Newest</span>
            <input checked={checkboxInput.sort_by === 'created_at' && checkboxInput.order === "asc"} onChange={() => {
              handleChange({sort_by: "created_at", order: "asc"});
              setTitleInput('Newest')
              }} type="checkbox" className="checkbox checkbox-md" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Oldest</span>
            <input checked={checkboxInput.sort_by === 'created_at' && checkboxInput.order === "desc"} onChange={() => {
              handleChange({sort_by: "created_at", order: "desc"});
              setTitleInput('Oldest')
              }} type="checkbox" className="checkbox checkbox-md" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Most Votes</span>
            <input checked={checkboxInput.sort_by === 'votes' && checkboxInput.order === "desc"} onChange={() => {
              handleChange({sort_by: "votes", order: "desc"});
              setTitleInput('Most Votes')
              }} type="checkbox" className="checkbox checkbox-md" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Least Votes</span>
            <input checked={checkboxInput.sort_by === 'votes' && checkboxInput.order === "asc"} onChange={() => {
              handleChange({sort_by: "votes", order: "asc"});
              setTitleInput('Least Votes')
              }} type="checkbox" className="checkbox checkbox-md" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Most Comments</span>
            <input checked={checkboxInput.sort_by === 'comment_count' && checkboxInput.order === "desc"} onChange={() => {
              handleChange({sort_by: "comment_count", order: "desc"});
              setTitleInput('Most Comments')
              }} type="checkbox" className="checkbox checkbox-md" />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Least Comments</span>
            <input checked={checkboxInput.sort_by === 'comment_count' && checkboxInput.order === "asc"} onChange={() => {
              handleChange({sort_by: "comment_count", order: "asc"}); setTitleInput('Least Comments') 
              }} type="checkbox" className="checkbox checkbox-md" />
          </label>

          <Divider />
        </div>

        <button onClick={handleSubmit} className="btn btn-block mt-auto">Apply <Next/></button>
      </div>
    </div>
  );
}
