function Buttons({fetchTeckStack,setInput}) {
  return (
    <div className="flex justify-center mt-2"> 
      <div className="w-full  max-w-2xl flex justify-between p-4 text-xl text-white rounded-md">
        <button className="bg-gray-800 text-white px-4 mr-1 py-2 rounded-md hover:bg-gray-500 w-1/2 shadow-sm shadow-sky-900" 
         onClick={fetchTeckStack}   >Submit</button>
        <button className="bg-gray-800 text-white px-4 ml-1 py-2 rounded-md hover:bg-gray-500 w-1/2 shadow-sm shadow-sky-900" 
           onClick={() => setInput("")} >Clear</button>
      </div>
    </div>
  );
}

export default Buttons;
