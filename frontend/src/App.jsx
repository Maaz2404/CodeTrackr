import ChatBox from "./components/ChatBox"
import SideBar from "./components/SideBar"
import Buttons from "./components/Buttons"

function App() {
  

  return (
    <>
    <div className="h-screen  flex">
      <div>
        <SideBar/>
      </div>
      <div className=" w-full bg-gray-900">
        <nav className="mb-5 text-2xl text-sky-500 bg-gray-950 p-2">Project Planner</nav>
        <h1 className="text-center text-5xl text-white my-5 text-shadow-2xs">What are you building today?</h1>
        <ChatBox/>
        <Buttons/>
      </div>
      
      

    </div>  
    </>
  )
}

export default App

