

function TechStack({frontend, backend, database, infra}) {
    return (
        <div className="flex items-center justify-center mt-5 gap-4">
            <div className="p-2 h-50 w-50 bg-gray-950 rounded-2xl ">
                <h3 className="text-white text-center mb-3">Frontend</h3>
                {frontend && frontend.map((tech, index) => (
                    <div className="flex p-2 bg-gray-800 justify-between" key={index}>
                        <li className="text-white">{tech}</li>
                        <input type="checkbox" id="checkbox"  />
                    </div>
                ))}
            </div>
            <div className="p-2 h-50 w-50 bg-gray-950 rounded-2xl ">
                <h3 className="text-white text-center mb-3">Backend</h3>
                {backend && backend.map((tech, index) => (
                    <div className="flex p-2 bg-gray-800 justify-between" key={index}>
                        <li className="text-white">{tech}</li>
                        <input type="checkbox" id="checkbox"  />
                    </div>
                ))}
            </div>
            <div className="p-2 h-50 w-50 bg-gray-950 rounded-2xl ">
                <h3 className="text-white text-center mb-3">Database</h3>
                {database && database.map((tech, index) => (
                    <div className="flex p-2 bg-gray-800 justify-between" key={index}>
                        <li className="text-white">{tech}</li>
                        <input type="checkbox" id="checkbox"  />
                    </div>
                ))}
            </div>
            <div className="p-2 h-50 w-50 bg-gray-950 rounded-2xl ">
                <h3 className="text-white text-center mb-3">Infra</h3>
                {infra && infra.map((tech, index) => (
                    <div className="flex p-2 bg-gray-800 justify-between" key={index}>
                        <li className="text-white">{tech}</li>
                        <input type="checkbox" id="checkbox"  />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TechStack