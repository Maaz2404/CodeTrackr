'use client';
import  {Spinner}  from '@/components/ui/shadcn-io/spinner';

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
  infraSelector,
  loading
}) {
  const handleCheckbox = (selected, setter, tech) => e => {
    if (e.target.checked) {
      setter([...selected, tech]);
    } else {
      setter(selected.filter(item => item !== tech));
    }
  };
  

  return (
    <div className="flex items-center justify-center mt-5 gap-4">
      {/* Frontend */}
      <div className="p-3 h-52 w-48 bg-gray-950 rounded-2xl flex flex-col">
        <h3 className="text-white text-center mb-3">Frontend</h3>
        {loading && (
            <div className='flex justify-center text-amber-50 items-center h-full'>
              
              <Spinner />
            </div>
          )}

        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {frontend && frontend.map((tech, index) => (
            <div className="flex p-2 bg-gray-800 justify-between" key={index}>
              <span className="text-white flex overflow-x-auto">{tech}</span>
              <input
                type="checkbox"
                checked={selectedFrontend.includes(tech)}
                onChange={handleCheckbox(selectedFrontend, frontendSelector, tech)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Backend */}
      <div className="p-3 h-52 w-48 bg-gray-950 rounded-2xl flex flex-col">
        <h3 className="text-white text-center mb-3">Backend</h3>
        {loading && (
            <div className='flex justify-center text-amber-50 items-center h-full'>
              
              <Spinner />
            </div>
          )}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {backend && backend.map((tech, index) => (
            <div className="flex p-2 bg-gray-800 justify-between" key={index}>
              <span className="text-white">{tech}</span>
              <input
                type="checkbox"
                checked={selectedBackend.includes(tech)}
                onChange={handleCheckbox(selectedBackend, backendSelector, tech)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Database */}
      <div className="p-3 h-52 w-48 bg-gray-950 rounded-2xl flex flex-col">
        <h3 className="text-white text-center mb-3">Database</h3>
        {loading && (
            <div className='flex justify-center text-amber-50 items-center h-full'>
              
              <Spinner />
            </div>
          )}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {database && database.map((tech, index) => (
            <div className="flex p-2 bg-gray-800 justify-between" key={index}>
              <span className="text-white">{tech}</span>
              <input
                type="checkbox"
                checked={selectedDatabase.includes(tech)}
                onChange={handleCheckbox(selectedDatabase, databaseSelector, tech)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Infra */}
      <div className="p-3 h-52 w-48 bg-gray-950 rounded-2xl flex flex-col">
        <h3 className="text-white text-center mb-3">Infra</h3>
        {loading && (
            <div className='flex justify-center text-amber-50 items-center h-full'>
              
              <Spinner />
            </div>
          )}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {infra && infra.map((tech, index) => (
            <div className="flex p-2 bg-gray-800 justify-between" key={index}>
              <span className="text-white ">{tech}</span>
              <input
                type="checkbox"
                checked={selectedInfra.includes(tech)}
                onChange={handleCheckbox(selectedInfra, infraSelector, tech)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStack;