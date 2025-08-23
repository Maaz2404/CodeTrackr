const Spinner = ({ size = 32, className = "" }) => (
  <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${className}`} 
       style={{ width: size, height: size }}>
  </div>
);

export default function TechStack({
  frontend = [],
  backend = [],
  database = [],
  infra = [],
  selectedFrontend = [],
  selectedBackend = [],
  selectedDatabase = [],
  selectedInfra = [],
  frontendSelector,
  backendSelector,
  databaseSelector,
  infraSelector,
  loading,
}) {
  const handleCheckbox = (selected, setter, tech) => e => {
    if (e.target.checked) {
      setter([...selected, tech]);
    } else {
      setter(selected.filter(item => item !== tech));
    }
  };

  const techSections = [
    { title: "Frontend", data: frontend, selected: selectedFrontend, setter: frontendSelector },
    { title: "Backend", data: backend, selected: selectedBackend, setter: backendSelector },
    { title: "Database", data: database, selected: selectedDatabase, setter: databaseSelector },
    { title: "Infra", data: infra, selected: selectedInfra, setter: infraSelector }
  ];

  return (
    <div className="px-4 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {techSections.map((section, index) => (
          <div key={index} className="p-3 h-52 bg-gray-950 rounded-2xl flex flex-col">
            <h3 className="text-white text-center mb-3 text-sm sm:text-base font-semibold">
              {section.title}
            </h3>
            
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Spinner size={32} />
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-y-auto space-y-1">
                {section.data.map((tech, techIndex) => (
                  <div className="flex p-2 bg-gray-800 justify-between items-center rounded" key={techIndex}>
                    <span className="text-white text-sm flex-1 truncate pr-2">{tech}</span>
                    <input
                      type="checkbox"
                      className="flex-shrink-0"
                      checked={section.selected.includes(tech)}
                      onChange={handleCheckbox(section.selected, section.setter, tech)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}