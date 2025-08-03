import { useState } from "react";

function DayCard({ dayObject, onDetails }) {
    return (
        <div className="p-2 text-center h-72 w-64 text-white bg-gray-800 rounded-2xl shadow-sm shadow-sky-800 flex flex-col flex-shrink-0 mx-2">
            <h3 className="font-bold text-2xl my-2">{dayObject.tasks.title}</h3>
            <h4 className="font-semibold underline mb-2">Summary</h4>
            <p className="mb-2 overflow-y-auto">{dayObject.tasks.summary}</p>
            <button
                className="bg-gray-950 p-0.5 rounded-sm mt-auto"
                onClick={onDetails}
            >
                Deliverables
            </button>
        </div>
    );
}

function Timeline({ days }) {
    const [selectedDay, setSelectedDay] = useState(null);

    return (
        <>
            <div className="flex justify-start overflow-x-auto w-full px-8 py-4 " style={{ minHeight: '18rem' }}>
                {days.map((day, index) => (
                    <DayCard
                        key={index}
                        dayObject={day}
                        onDetails={() => setSelectedDay(day)}
                    />
                ))}
            </div>
            {selectedDay && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg min-w-[300px]">
                        <h2 className="text-xl font-bold mb-2">{selectedDay.tasks.title}</h2>
                        <h4 className="font-semibold underline mb-2">Deliverables</h4>
                        <ul>
                            {selectedDay.tasks.deliverables.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        <button
                            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
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

export default Timeline;