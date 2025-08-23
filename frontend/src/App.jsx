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
import { Menu} from "lucide-react";


function App() {
  const [frontend, setFrontend] = useState([]);
  const [backend, setBackend] = useState([]);
  const [database, setDatabase] = useState([]);
  const [infra, setInfra] = useState([]);
  const [input, setInput] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFrontend, setSelectedFrontend] = useState([]);
  const [selectedBackend, setSelectedBackend] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState([]);
  const [selectedInfra, setSelectedInfra] = useState([]);
  const [hours, setHours] = useState(1);
  const [loadingStack, setLoadingStack] = useState(false);
  const [techstackRendered, setTechstackRendered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title,setTitle] = useState("")
  const baseURL = import.meta.env.VITE_BASE_URL
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
}, [loggedIn]); 

  function fetchTechStack() {
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

  const createTimeline = () => {
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
    
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SideBar 
        projects={projects} 
        setLoading={setLoading} 
        setDays={setDays} 
        showTimeline={setShowTimeline}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main content */}
      <div className="flex-1 bg-gray-900 overflow-hidden lg:ml-0">
        {/* Navigation */}
        <nav className="h-16 bg-gray-950 p-2 flex justify-between items-center">
          {/* Hamburger menu for mobile */}
          <button
            className="text-white lg:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          {/* App title on mobile */}
          <h1 className="text-sky-500 text-lg font-semibold lg:hidden">CodeTrackr</h1>
          
          {/* Sign up component */}
          <div className="ml-auto">
            <SignUp loggedIn={loggedIn} setloggedIn={setLoggedIn} />
          </div>
        </nav>

        {/* Main content area */}
        <div className="p-4 sm:p-6">
          <h1 className="text-center text-2xl sm:text-3xl lg:text-5xl text-white my-4 sm:my-5">
            What are you building today?
          </h1>
          
          <ChatBox setInput={setInput} input={input} />
          <Buttons setInput={setInput} fetchTeckStack={fetchTechStack} />
          
          {loading && (
            <div className="flex justify-center items-center my-8">
              <Spinner size={64} />
            </div>
          )}
          
          {!showTimeline && !loading && (
            <>
              <TechStack 
                frontend={frontend} 
                backend={backend} 
                database={database} 
                infra={infra} 
                selectedBackend={selectedBackend} 
                selectedFrontend={selectedFrontend} 
                selectedDatabase={selectedDatabase}
                selectedInfra={selectedInfra} 
                frontendSelector={setSelectedFrontend} 
                backendSelector={setSelectedBackend}
                databaseSelector={setSelectedDatabase} 
                infraSelector={setSelectedInfra} 
                loading={loadingStack} 
              />
              
              {techstackRendered && (
                <>
                  <div className="flex flex-col items-center my-5">
                    <label className="text-white text-base sm:text-lg mx-5 text-center" htmlFor="slider">
                      Hours per day
                    </label>
                    <input
                      className="text-white mt-2"
                      type="range"
                      id="slider"
                      min="1"
                      max="8"
                      value={hours}
                      onChange={e => setHours(Number(e.target.value))}
                    />
                    <div className="flex justify-between w-32 sm:w-40 mt-2 text-white text-xs sm:text-sm">
                      <span>Min: 1</span>
                      <span>Selected: {hours}</span>
                      <span>Max: 8</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-5">
                    <button
                      className="text-white text-lg sm:text-2xl bg-gray-800 p-3 sm:p-4 rounded-md hover:bg-gray-500 shadow-sm shadow-sky-900 transition-colors"
                      onClick={createTimeline}
                    >
                      Create timeline
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          
          {showTimeline && <Timeline days={days} />}
        </div>
      </div>
    </div>
  );
}

export default App;