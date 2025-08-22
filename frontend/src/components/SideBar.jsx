import axios from 'axios'
function SideBar({projects,setLoading,setDays,showTimeline}) {
    const baseUrl = import.meta.env.VITE_BASE_URL
    function handleProjectButtonClick(id){
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

    return(
        <div className='h-full'>
            <aside className="w-44 h-full  bg-gray-950 p-4">
                <h2 className="text-3xl  text-sky-500 mb-4">CodeTrackr</h2>
                <div className="flex-row mt-10 px-2">
                    <h3 className="text-white">
                        New Project
                    </h3>
                    <h3 className="text-white mt-4">
                        Saved Projects
                    </h3>
                    <ul className="text-white mt-3 flex flex-col items-center">
                        {projects.map((project) => (
                            <li className="my-2" key={project.id}>
                                <button
                                    className='bg-gray-500 border-2 border-gray-700 hover:bg-gray-600 p-1 max-h-10 min-w-full overflow-x-auto overflow-y-clip'
                                    onClick={() => handleProjectButtonClick(project.id)}
                                >
                                    {project.name}
                                </button>
                            </li>
                        )
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    )
}
export default SideBar;