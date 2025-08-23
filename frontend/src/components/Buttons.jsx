export default function Buttons({ fetchTeckStack, setInput }) {
  return (
    <div className="flex justify-center mt-2 px-4"> 
      <div className="w-full max-w-2xl flex gap-2 p-4">
        <button 
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500 flex-1 shadow-sm shadow-sky-900 text-sm sm:text-base"
          onClick={fetchTeckStack}
        >
          Submit
        </button>
        <button 
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500 flex-1 shadow-sm shadow-sky-900 text-sm sm:text-base"
          onClick={() => setInput("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
}