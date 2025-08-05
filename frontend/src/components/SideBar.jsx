function SideBar() {
    return(
        <div>
            <aside className="w-44   h-screen  bg-gray-950 p-4">
                <h2 className="text-3xl  text-sky-500 mb-4">CodeTrackr</h2>
                <ul className="flex-row mt-10 px-2">
                    <li className="text-white">
                        New Project
                    </li>
                    <li className="text-white mt-4">
                        Saved Projects
                    </li>
                </ul>
            </aside>
        </div>
    )
}
export default SideBar;