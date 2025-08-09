function SideBar({projects}) {
    return(
        <div>
            <aside className="w-44   h-screen  bg-gray-950 p-4">
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
                            <li className="my-2" key={project.name}><button>
                                {project.name}</button></li>
                        )
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    )
}
export default SideBar;