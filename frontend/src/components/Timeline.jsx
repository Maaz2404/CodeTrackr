import { useState } from "react";


export default function Timeline({days}) {
  const [selectedDay, setSelectedDay] = useState(null);

  function DayCard({ dayObject, onDetails }) {
    if (dayObject.tasks){
           dayObject = dayObject.tasks 
        }
    
    return (
      <div className="p-4 text-center h-64 w-56 sm:w-64 text-white bg-gray-800 rounded-2xl shadow-sm shadow-sky-800 flex flex-col flex-shrink-0 mx-2">
        <h3 className="font-bold text-lg sm:text-2xl my-2 line-clamp-2">{dayObject.title}</h3>
        <h4 className="font-semibold underline mb-2 text-sm sm:text-base">Summary</h4>
        <p className="mb-2 overflow-y-auto text-xs sm:text-sm flex-1">{dayObject.summary}</p>
        <button
          className="bg-gray-950 p-2 rounded-sm mt-auto text-sm hover:bg-gray-700 transition-colors"
          onClick={onDetails}
        >
          Deliverables
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start overflow-x-auto w-full px-4 py-4" style={{ minHeight: '18rem' }}>
        {days.map((day, index) => (
          <DayCard
            key={index}
            dayObject={day}
            onDetails={() => {
              const normalized = day.tasks ? day.tasks : day;
              setSelectedDay(normalized);
            }}
          />
        ))}
      </div>

      {selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white text-black p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md max-h-96 overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-2">{selectedDay.title}</h2>
            <h4 className="font-semibold underline mb-2">Deliverables</h4>
            <ul className="space-y-1 mb-4">
              {selectedDay.deliverables?.map((item, idx) => (
                <li key={idx} className="text-sm sm:text-base">{item}</li>
              ))}
            </ul>
            <button
              className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              onClick={() => setSelectedDay(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
