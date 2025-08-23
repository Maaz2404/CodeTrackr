export default function ChatBox({ input, setInput }) {
  return (
    <div className="flex justify-center px-4">
      <textarea 
        className="bg-gray-800 text-white shadow-sm shadow-sky-900 w-full max-w-2xl h-24 sm:h-32 p-4 mt-6 sm:mt-10 rounded-lg text-sm sm:text-base"
        placeholder="Describe what you're building..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
    </div>
  );
}