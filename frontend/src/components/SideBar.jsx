function SideBar() {
    return(
        <div>
            <aside className="w-44   h-screen  bg-gray-950 p-4">
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