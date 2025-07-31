
const ChatBox = ({setInput}) => {

    return(
        <div className="flex justify-center ">
            <textarea className="bg-gray-800 text-white shadow-sm shadow-sky-900 w-2xl h-32 p-4 mt-10"
              onChange={e => 
                
              setInput(e.target.value)}></textarea>
        </div>
        
    )
}
export default ChatBox;