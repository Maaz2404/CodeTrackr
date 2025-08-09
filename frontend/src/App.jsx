import ChatBox from "./components/ChatBox"
import SideBar from "./components/SideBar"
import Buttons from "./components/Buttons"
import TechStack from "./components/TechStack"
import Timeline from "./components/Timeline"
import SignUp from "./components/SignUp"
import { useState,useEffect } from "react"
import axios from "axios"
'use client';
import  {Spinner}  from '@/components/ui/shadcn-io/spinner';


function App() {
  const [frontend,setFrontend] = useState([]);
  const [backend,setBackend] = useState([]);
  const [database,setDatabase] = useState([]);
  const [infra,setInfra] = useState([]);
  const [input, setInput] = useState("");
  const [showTimeline,setShowTimeline] = useState(false)
  const [days,setDays] = useState([])
  const [loading,setLoading] = useState(false)
  const [selectedFrontend, setSelectedFrontend] = useState([]);
  const [selectedBackend, setSelectedBackend] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState([]);
  const [selectedInfra, setSelectedInfra] = useState([]);
  const [hours,setHours] = useState(1)
  const [loadingStack, setLoadingStack] = useState(false);
  const [techstackRendered, setTechstackRendered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  const [projects,setProjects] = useState([])
  const [title,setTitle] = useState("")


  const baseURL = "http://127.0.0.1:8000/";
  useEffect(() => {
  if (loggedIn) {
    axios.get(baseURL + "llm/timelines", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then((res) => {
      console.log(res.data)
      setProjects(res.data.timelines); // store in a state
    })
    .catch((err) => {
      console.error("Error loading projects:", err);
    });
  }
}, [loggedIn]); // runs whenever login status changes

  function fetchTeckStack() {
    setLoadingStack(true);
    setTechstackRendered(false)
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
      setTechstackRendered(true)
      
    }).catch((error)=>{
      console.error("There was an error fetching LLM response", error);
    }).finally(() => {
      setLoadingStack(false);
    } )
  }
  
  

  return (
    <>
    <div className="min-h-screen flex">
      <div>
        <SideBar projects={projects}/>
      </div>
      <div className=" w-full bg-gray-900 overflow-hidden">
        <nav className="mb-5 text-2xl h-16 text-sky-500 bg-gray-950 p-2">
          <SignUp loggedIn={loggedIn} setloggedIn={setLoggedIn}/>
        </nav>
        <h1 className="text-center text-5xl text-white my-5 text-shadow-2xs">What are you building today?</h1>
        <ChatBox setInput={setInput}input={input}/>
        <Buttons setInput={setInput} fetchTeckStack={fetchTeckStack}/>
        {loading && (
            <div className="flex justify-center items-center">
              <Spinner className="text-white text-center my-5 mx-auto"size={64}/>          
              </div>
          )}
        {!showTimeline && !loading  && (
        <><TechStack frontend={frontend} backend={backend} database={database} infra={infra} 
           selectedBackend={selectedBackend} selectedFrontend={selectedFrontend} selectedDatabase={selectedDatabase}
           selectedInfra={selectedInfra} frontendSelector={setSelectedFrontend} backendSelector={setSelectedBackend}
           databaseSelector={setSelectedDatabase} infraSelector={setSelectedInfra} loading={loadingStack} />
         { techstackRendered && (<>
          <div className="flex flex-col items-center my-5">
          <label className="text-white text-lg mx-5 text-center" htmlFor="slider">
            Hours per day
          </label>
          <input
            className="text-white"
            type="range"
            id="slider"
            min="1"
            max="8"
            value={hours}
            onChange={e => setHours(Number(e.target.value))}
          />
  <div className="flex justify-between w-40 mt-2 text-white text-sm">
    <span>Min: 1</span>
    <span>Selected: {hours}</span>
    <span>Max: 8</span>
  </div>
</div>
        <div className="flex justify-center mt-5">
  <button
    className="text-white text-2xl bg-gray-800 p-2 rounded-md hover:bg-gray-500 shadow-sm shadow-sky-900"
    onClick={() => {
      setLoading(true); // Start loading immediately
      axios.post(baseURL + 'llm/timeline', {
        "prompt": input,
        "frontend": selectedFrontend,
        "backend": selectedBackend,
        "database": selectedDatabase,
        "infra": selectedInfra,
        "hrs_per_day": hours
      })
      .then((response) => {
        console.log("API timeline response:", response.data);
        setDays(response.data.days);
        setTitle(response.data.title)
        setShowTimeline(true);
        if (loggedIn){
        axios.post(baseURL + 'llm/save_timeline',{
          'days':response.data.days,
          'title':response.data.title
        },{
          headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
        }).catch((error)=>{
          console.error("There was an error saving the timeline: ", error);
        })
      }
      })
      .catch((error) => {
        console.error("There was an error fetching timeline", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading after request finishes
      });
    }}
  >
    Create timeline
  </button>
</div>
        </> )}  
        
        </>
        )}
        {showTimeline && (
          <>
          <Timeline days={days}/>
          </>
        )}
        
      </div>

    </div>  
    </>
  )
}

export default App

