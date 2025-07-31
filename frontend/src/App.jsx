import ChatBox from "./components/ChatBox"
import SideBar from "./components/SideBar"
import Buttons from "./components/Buttons"
import TechStack from "./components/TechStack"
import { useState } from "react"
import axios from "axios"

function App() {
  const [frontend,setFrontend] = useState([]);
  const [backend,setBackend] = useState([]);
  const [database,setDatabase] = useState([]);
  const [infra,setInfra] = useState([]);
  const [input, setInput] = useState("");
  

  const baseURL = "http://127.0.0.1:8000/";

  function fetchTeckStack() {
    axios.post(baseURL + "llm/",{
      "prompt":`${input}`
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      const data = response.data
      setBackend(data.backend)
      setFrontend(data.frontend)
      setDatabase(data.database)
      setInfra(data.infra)
    }).catch((error)=>{
      console.error("There was an error fetching LLM response", error);
    }) 
  }
  

  return (
    <>
    <div className="h-screen  flex">
      <div>
        <SideBar/>
      </div>
      <div className=" w-full bg-gray-900">
        <nav className="mb-5 text-2xl text-sky-500 bg-gray-950 p-2">Project Planner</nav>
        <h1 className="text-center text-5xl text-white my-5 text-shadow-2xs">What are you building today?</h1>
        <ChatBox setInput={setInput}/>
        <Buttons setInput={setInput} fetchTeckStack={fetchTeckStack}/>
        <TechStack frontend={frontend} backend={backend} database={database} infra={infra}   />
        <div className="flex justify-center my-5">
          <label className=" text-amber-50" classnamehtmlfor="slider"></label>
          <input type="range" id="slider" name="Hours per day" min="1" max="8"/>
        </div>
        <div className="flex justify-center mt-5">
          <button className=" text-white text-2xl bg-gray-800 p-3 rounded-md hover:bg-gray-500 shadow-sm shadow-sky-900">Create timeline</button>
        </div>
        
      </div>
      
      

    </div>  
    </>
  )
}

export default App

