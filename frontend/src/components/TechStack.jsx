


function TechStack({
  frontend,
  backend,
  database,
  infra,
  selectedFrontend,
  selectedBackend,
  selectedDatabase,
  selectedInfra,
  frontendSelector,
  backendSelector,
  databaseSelector,
  infraSelector
}) {
  // Helper for checkbox logic
  const handleCheckbox = (selected, setter, tech) => e => {
    if (e.target.checked) {
      setter([...selected, tech]);
    } else {
      setter(selected.filter(item => item !== tech));
    }
  };

  return (
    <div className="flex items-center justify-center mt-5 gap-4">
      <div className="p-2 h-50 w-50 bg-gray-950 rounded-2xl ">
        <h3 className="text-white text-center mb-3">Frontend</h3>
        {frontend && frontend.map((tech, index) => (
          <div className="flex p-2 overflow-y-auto bg-gray-800 justify-between" key={index}>
            <ul className="text-white">{tech}</ul>
            <input
              type="checkbox"
              checked={selectedFrontend.includes(tech)}
              onChange={handleCheckbox(selectedFrontend, frontendSelector, tech)}
            />
          </div>
        ))}
      </div>
      <div className="p-2 h-50 w-50 bg-gray-950 rounded-2xl ">
        <h3 className="text-white text-center mb-3">Backend</h3>
        {backend && backend.map((tech, index) => (
          <div className="flex p-2 overflow-y-auto bg-gray-800 justify-between" key={index}>
            <ul className="text-white">{tech}</ul>
            <input
              type="checkbox"
              checked={selectedBackend.includes(tech)}
              onChange={handleCheckbox(selectedBackend, backendSelector, tech)}
            />
          </div>
        ))}
      </div>
      <div className="p-2 h-50 w-50 bg-gray-950 rounded-2xl ">
        <h3 className="text-white text-center mb-3">Database</h3>
        {database && database.map((tech, index) => (
          <div className="flex p-2 overflow-y-auto bg-gray-800 justify-between" key={index}>
            <ul className="text-white">{tech}</ul>
            <input
              type="checkbox"
              checked={selectedDatabase.includes(tech)}
              onChange={handleCheckbox(selectedDatabase, databaseSelector, tech)}
            />
          </div>
        ))}
      </div>
      <div className="p-2 h-50 w-50 bg-gray-950 rounded-2xl ">
        <h3 className="text-white text-center mb-3">Infra</h3>
        {infra && infra.map((tech, index) => (
          <div className="flex p-2 overflow-y-auto bg-gray-800 justify-between" key={index}>
            <ul className="text-white">{tech}</ul>
            <input
              type="checkbox"
              checked={selectedInfra.includes(tech)}
              onChange={handleCheckbox(selectedInfra, infraSelector, tech)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStack;