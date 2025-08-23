import axios from 'axios'
import { X } from "lucide-react";

export default function SideBar({ projects, setLoading, setDays, showTimeline, isOpen, onClose }) {
  const baseUrl =  import.meta.env.VITE_BASE_URL
  function handleProjectButtonClick(id) {
    setLoading(true)
        showTimeline(true)
        
            axios.get(baseUrl + `llm/timelines/${id}`,{
                headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
      }).then((response)=>{
        console.log(response.data)
        const days = response.data
        setDays(days)
        setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })
        
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 min-h-full w-64 bg-gray-950 p-4 z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:w-44
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white lg:hidden"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl lg:text-3xl text-sky-500 mb-4">CodeTrackr</h2>
        
        <div className="flex-row mt-10 px-2">
          <h3 className="text-white text-sm lg:text-base">New Project</h3>
          <h3 className="text-white mt-4 text-sm lg:text-base">Saved Projects</h3>
          
          <ul className="text-white mt-3 flex flex-col items-center">
            {projects.map((project) => (
              <li className="my-2 w-full" key={project.id}>
                <button
                  className="bg-gray-500 border-2 border-gray-700 hover:bg-gray-600 p-2 w-full text-sm lg:text-base rounded overflow-hidden text-ellipsis"
                  onClick={() => handleProjectButtonClick(project.id)}
                >
                  {project.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}